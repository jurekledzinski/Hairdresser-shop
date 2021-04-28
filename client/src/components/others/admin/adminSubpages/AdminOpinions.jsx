import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

import { fetchOpinions } from "../../../../reduxStore/actions/actionFetchOpinions";

import "./AdminOpinions.scss";

import useColumnsTableOpinions from "../adminCustomHooks/useColumnsTableOpinions";

import ControlPrevNextPage from "../adminTablesControl/ControlPrevNextPage";
import GlobalFilter from "../adminTablesGlobalFilter/GlobalFilter";
import TableOpinions from "../adminTables/TableOpinions";

import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";

import MessagePopup from "../adminPopUpMessage/MessagePopup";

import ErrorSuccessMessage from "../../errorSuccessMessages/ErrorSuccessMessages";

import useRemoveOpinion from "../adminCustomHooks/useRemoveOpinion";

const AdminOpinions = () => {
  const dispatch = useDispatch();
  const adminDateUse = useSelector((store) => store.useAdminData);
  const dataOpinions = useSelector((store) => store.opinionsData);
  const dataAlert = useSelector((store) => store.alertData);
  const { opinions } = dataOpinions;

  const [currentOpinions, setCurrentOpinions] = useState([]);
  const [idOpinion, setIdOpinion] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { columns, data } = useColumnsTableOpinions(
    currentOpinions,
    setIdOpinion,
    setIsOpenModal
  );
  const { handleRemoveItem } = useRemoveOpinion(
    currentOpinions,
    idOpinion,
    setCurrentOpinions,
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
    dispatch(fetchOpinions());
  }, [dispatch]);

  useEffect(() => {
    if (opinions.length > 0) {
      setCurrentOpinions(opinions);
    }
  }, [opinions]);

  return (
    <article className="admin-opinions">
      {dataAlert.errorServerMsg ? (
        <ErrorSuccessMessage />
      ) : (
        <ErrorSuccessMessage />
      )}
      <div className="admin-opinions__wrapper">
        <GlobalFilter
          data={currentOpinions}
          filter={globalFilter}
          setFilter={setGlobalFilter}
        />
        <TableOpinions
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
        enableAction={adminDateUse.enableOpinions}
        isOpenModal={isOpenModal}
        handleRemoveItem={handleRemoveItem}
        handleNotRemoveItem={handleNotRemoveItem}
        purpose="opinion"
      />
    </article>
  );
};

export default AdminOpinions;
