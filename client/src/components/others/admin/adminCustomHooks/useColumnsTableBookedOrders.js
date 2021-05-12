import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import format from "date-fns/format";

const useColumnsTableBookedOrders = (
  setIdBookedOrder,
  setIdCancelOrder,
  setIsOpenModal
) => {
  const dataBookedOrdersToUse = useSelector((store) => store.bookedOrdersData);
  const history = useHistory();

  const columns = useMemo(
    () => [
      { Header: "Name Surname", accessor: "name" },
      {
        Header: "Date booking",
        accessor: "date",
        Cell: ({ value }) => {
          return format(new Date(value), "MM/dd/yyyy");
        },
      },
      {
        Header: "Time booking",
        accessor: "bookTime",
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
            className="admin-booked__btn-remove"
            onClick={() => {
              history.push(
                `/admin/details-booked-order/${propsTable.row.original._id}`
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
            className="admin-booked__btn-remove"
            onClick={() => {
              console.log(propsTable.row.original);
              setIsOpenModal(true);
              setIdBookedOrder(propsTable.row.original._id);
              setIdCancelOrder(propsTable.row.original.cancelCode);
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        ),
      },
    ],
    [dataBookedOrdersToUse]
  );
  const data = useMemo(() => dataBookedOrdersToUse, [dataBookedOrdersToUse]);

  return { columns, data };
};

export default useColumnsTableBookedOrders;
