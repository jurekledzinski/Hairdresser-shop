import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

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
  const adminDateUse = useSelector((store) => store.useAdminData);
  const dataAlert = useSelector((store) => store.alertData);
  const opinionsData = useSelector((store) => store.opinionsDataToUse);

  const [idOpinion, setIdOpinion] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { columns, data } = useColumnsTableOpinions(
    setIdOpinion,
    setIsOpenModal
  );
  const { handleRemoveItem } = useRemoveOpinion(idOpinion, setIsOpenModal);
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

  return (
    <article className="admin-opinions">
      {dataAlert.errorServerMsg ? (
        <ErrorSuccessMessage />
      ) : (
        <ErrorSuccessMessage />
      )}
      <div className="admin-opinions__wrapper">
        <GlobalFilter
          data={opinionsData}
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
