import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

import { fetchEmails } from "../../../../reduxStore/actions/actionFetchEmails";

import "./AdminEmails.scss";

import useColumnsTableEmails from "../adminCustomHooks/useColumnsTableEmails";
import ControlPrevNextPage from "../adminTablesControl/ControlPrevNextPage";
import GlobalFilter from "../adminTablesGlobalFilter/GlobalFilter";
import TableEmails from "../adminTables/TableEmails";

import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";

import MessagePopup from "../adminPopUpMessage/MessagePopup";

import ErrorSuccessMessage from "../../errorSuccessMessages/ErrorSuccessMessages";

import useRemoveEmail from "../adminCustomHooks/useRemoveEmail";

const AdminEmails = () => {
  const dispatch = useDispatch();
  const dataEmails = useSelector((store) => store.emailsData);
  const dataAlert = useSelector((store) => store.alertData);
  const { emails } = dataEmails;

  const [currentEmails, setCurrentEmails] = useState([]);
  const [idEmail, setIdEmail] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { columns, data } = useColumnsTableEmails(
    currentEmails,
    setIdEmail,
    setIsOpenModal
  );
  const { handleRemoveItem } = useRemoveEmail(
    currentEmails,
    idEmail,
    setCurrentEmails,
    setIsOpenModal
  );
  useDeleteErrorMessage();

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  const handleNotRemoveItem = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  useEffect(() => {
    if (emails.length > 0) {
      setCurrentEmails(emails);
    }
  }, [emails]);

  return (
    <article className="admin-email">
      {dataAlert.errorServerMsg ? (
        <ErrorSuccessMessage />
      ) : (
        <ErrorSuccessMessage />
      )}
      <div className="admin-email__wrapper">
        <GlobalFilter
          data={currentEmails}
          filter={globalFilter}
          setFilter={setGlobalFilter}
        />
        <TableEmails
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          page={page}
          prepareRow={prepareRow}
        />
        <ControlPrevNextPage
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          nextPage={nextPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          previousPage={previousPage}
        />
      </div>
      <MessagePopup
        isOpenModal={isOpenModal}
        handleRemoveItem={handleRemoveItem}
        handleNotRemoveItem={handleNotRemoveItem}
      />
    </article>
  );
};

export default AdminEmails;
