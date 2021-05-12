import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

import "./AdminBooked.scss";

import useColumnsTableBookedOrders from "../adminCustomHooks/useColumnsTableBookedOrders";
import ControlPrevNextPage from "../adminTablesControl/ControlPrevNextPage";
import GlobalFilter from "../adminTablesGlobalFilter/GlobalFilter";
import TableOpinions from "../adminTables/TabelBookedCanceled";

import MessagePopup from "../adminPopUpMessage/MessagePopup";
import ErrorSuccessMessage from "../../errorSuccessMessages/ErrorSuccessMessages";
import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";
import useRemoveBookedOrder from "../adminCustomHooks/useRemoveBookedOrder";

const AdminBooked = () => {
  const dispatch = useDispatch();
  const adminDateUse = useSelector((store) => store.useAdminData);
  const dataBookedOrdersToUse = useSelector((store) => store.bookedOrdersData);
  const dataAlert = useSelector((store) => store.alertData);
  const [idBookedOrder, setIdBookedOrder] = useState(null);
  const [idCancelOrder, setIdCancelOrder] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  console.log(dataBookedOrdersToUse, " dataBookedOrdersToUse");
  console.log(dataAlert, " dataAlert");

  const { columns, data } = useColumnsTableBookedOrders(
    setIdBookedOrder,
    setIdCancelOrder,
    setIsOpenModal
  );

  const { handleRemoveItem } = useRemoveBookedOrder(
    idBookedOrder,
    idCancelOrder,
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

  return (
    <article className="admin-booked">
      {dataAlert.errorServerMsg ? (
        <ErrorSuccessMessage />
      ) : (
        <ErrorSuccessMessage />
      )}
      <div className="admin-booked__wrapper">
        <GlobalFilter
          data={dataBookedOrdersToUse}
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
        <MessagePopup
          enableAction={adminDateUse.enableBook}
          isOpenModal={isOpenModal}
          handleRemoveItem={handleRemoveItem}
          handleNotRemoveItem={handleNotRemoveItem}
          purpose="order"
        />
      </div>
    </article>
  );
};

export default AdminBooked;
