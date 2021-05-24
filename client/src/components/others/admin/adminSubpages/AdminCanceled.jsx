import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

import "./AdminCanceled.scss";

import useColumnsTableCanceledOrders from "../adminCustomHooks/useColumnsTableCanceledOrders";
import ControlPrevNextPage from "../adminTablesControl/ControlPrevNextPage";
import GlobalFilter from "../adminTablesGlobalFilter/GlobalFilter";
import TableOpinions from "../adminTables/TabelBookedCanceled";

import MessagePopup from "../adminPopUpMessage/MessagePopup";
import ErrorSuccessMessage from "../../errorSuccessMessages/ErrorSuccessMessages";
import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";
import useRemoveCanceledOrder from "../adminCustomHooks/useRemoveCanceledOrder";

const AdminCanceled = () => {
  const dispatch = useDispatch();
  const adminDateUse = useSelector((store) => store.useAdminData);
  const dataCanceledOrdersToUse = useSelector(
    (store) => store.canceledOrderData
  );
  const dataAlert = useSelector((store) => store.alertData);
  const [idOrderCanceled, setIdOrderCanceled] = useState(null);
  const [idCancelOrder, setIdCancelOrder] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { columns, data } = useColumnsTableCanceledOrders(
    setIdOrderCanceled,
    setIdCancelOrder,
    setIsOpenModal
  );

  const { handleRemoveItem } = useRemoveCanceledOrder(
    idOrderCanceled,
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
    <article className="admin-canceled">
      {dataAlert.errorServerMsg ? (
        <ErrorSuccessMessage />
      ) : (
        <ErrorSuccessMessage />
      )}
      <div className="admin-canceled__wrapper">
        <GlobalFilter
          data={dataCanceledOrdersToUse}
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
          enableAction={adminDateUse.enableCancel}
          isOpenModal={isOpenModal}
          handleRemoveItem={handleRemoveItem}
          handleNotRemoveItem={handleNotRemoveItem}
          purpose="order"
        />
      </div>
    </article>
  );
};

export default AdminCanceled;
