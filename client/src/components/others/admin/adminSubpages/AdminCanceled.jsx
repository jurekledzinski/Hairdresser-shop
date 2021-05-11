import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

// Fetch booked z action

import "./AdminCanceled.scss";

import ControlPrevNextPage from "../adminTablesControl/ControlPrevNextPage";
import GlobalFilter from "../adminTablesGlobalFilter/GlobalFilter";
import TableOpinions from "../adminTables/TabelBookedCanceled";

const dummyBooking = [
  {
    _id: 1,
    name: "Jerzy Ledzinski",
    date: "29.04.2021",
    time: "13:00",
    hairdresser: "Joe doe",
  },
  {
    _id: 2,
    name: "Molly Be",
    date: "23.04.2021",
    time: "10:00",
    hairdresser: "Mike Bobo",
  },
  {
    _id: 3,
    name: "Merry Bike",
    date: "26.04.2021",
    time: "16:00",
    hairdresser: "John Case",
  },
];

const AdminCanceled = () => {
  const dispatch = useDispatch();
  //   const dataOpinions = useSelector((store) => store.opinionsData);
  //   const { opinions } = dataOpinions;

  const history = useHistory();

  const columns = useMemo(
    () => [
      { Header: "Name Surname", accessor: "name" },
      {
        Header: "Date canceling",
        accessor: "date",
      },
      {
        Header: "Time canceling",
        accessor: "time",
      },

      {
        Header: "Hairdresser",
        accessor: "hairdresser",
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
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        ),
      },
    ],
    [dummyBooking]
  );
  const data = useMemo(() => dummyBooking, [dummyBooking]);

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

  //   useEffect(() => {
  //     dispatch(fetchOpinions());
  //   }, [dispatch]);

  return (
    <article className="admin-canceled">
      <div className="admin-canceled__wrapper">
        <GlobalFilter
          data={dummyBooking}
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
    </article>
  );
};

export default AdminCanceled;
