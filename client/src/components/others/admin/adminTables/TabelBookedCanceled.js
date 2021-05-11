import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./TabelBookedCanceled.scss";

const TabelBookedCanceled = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
}) => {
  const [checkWindowMedium, setCheckWindowMedium] = useState(
    window.innerWidth >= 800 ? true : false
  );

  const [addNewHeaders, setAddNewHeaders] = useState([]);

  useEffect(() => {
    let headersTabel = [];

    for (let j = 0; j < page.length; j++) {
      for (let i = 0; i < headerGroups[0].headers.length; i++) {
        headersTabel = [...headersTabel, headerGroups[0].headers[i]];
      }
    }

    const mobileHeaders = headersTabel.map((item) => {
      return {
        ...item,
        id: uuidv4(),
      };
    });

    const addHeadersMobile = headerGroups.map((item) => {
      return {
        ...item,
        headers: mobileHeaders,
      };
    });

    setAddNewHeaders(addHeadersMobile);
  }, [page]);

  const handleSizeWindow = () => {
    window.innerWidth >= 800
      ? setCheckWindowMedium(true)
      : setCheckWindowMedium(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSizeWindow);
    return () => window.removeEventListener("resize", handleSizeWindow);
  }, []);

  return (
    <table className="table-booked-canceled" {...getTableProps()}>
      <thead className="table-booked-canceled__head">
        {checkWindowMedium
          ? headerGroups.map((headerGroups) => (
              <tr
                className="table-booked-canceled__head-tr"
                {...headerGroups.getHeaderGroupProps()}
              >
                {headerGroups.headers.map((column) => (
                  <th
                    className="table-booked-canceled__head-th"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))
          : addNewHeaders.map((headerGroups) => (
              <tr
                className="table-booked-canceled__head-tr"
                {...headerGroups.getHeaderGroupProps()}
              >
                {headerGroups.headers.map((column) => (
                  <th
                    className="table-booked-canceled__head-th"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={(column.getHeaderProps().key = uuidv4())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
      </thead>
      <tbody className="table-booked-canceled__body" {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr
              className="table-booked-canceled__body-tr"
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    className="table-booked-canceled__body-td--booked-canceled"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TabelBookedCanceled;
