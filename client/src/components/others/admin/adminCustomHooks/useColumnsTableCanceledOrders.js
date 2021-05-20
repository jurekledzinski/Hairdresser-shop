import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import format from "date-fns/format";

const useColumnsTableCanceledOrders = (
  setIdOrderCanceled,
  setIdCancelOrder,
  setIsOpenModal
) => {
  const dataCanceledOrdersToUse = useSelector(
    (store) => store.canceledOrderData
  );
  const history = useHistory();

  const columns = useMemo(
    () => [
      { Header: "Name Surname", accessor: "name" },
      {
        Header: "Date canceling",
        accessor: "date",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
      },
      {
        Header: "Time canceling",
        accessor: "cancelTime",
        Cell: ({ value }) => {
          return format(new Date(value), "HH:mm");
        },
      },

      {
        Header: "Hairdresser",
        accessor: "hairdresserName",
      },
      {
        Header: "Details",
        disableSortBy: true,
        id: "details",
        accessor: (str) => "details",
        Cell: (propsTable) => (
          <button
            className="admin-canceled__btn-remove"
            onClick={() => {
              console.log(propsTable.row.original._id);
              history.push(
                `/admin/details-canceled-order/${propsTable.row.original._id}`
              );
            }}
          >
            Details
          </button>
        ),
      },
      {
        Header: "Remove",
        disableSortBy: true,
        id: "remove",
        accessor: (str) => "remove",
        Cell: (propsTable) => (
          <button
            className="admin-canceled__btn-remove"
            onClick={() => {
              console.log(propsTable.row.original._id);
              setIsOpenModal(true);
              setIdOrderCanceled(propsTable.row.original._id);
              setIdCancelOrder(propsTable.row.original.cancelCode);
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        ),
      },
    ],
    [dataCanceledOrdersToUse]
  );
  const data = useMemo(
    () => dataCanceledOrdersToUse,
    [dataCanceledOrdersToUse]
  );
  return { columns, data };
};

export default useColumnsTableCanceledOrders;
