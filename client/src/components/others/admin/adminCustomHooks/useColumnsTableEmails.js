import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";

const useColumnsTableEmails = (setIdEmail, setIsOpenModal) => {
  const emailsData = useSelector((store) => store.emailDataToUse);
  const columns = useMemo(
    () => [
      { Header: "Name Surname", accessor: "name" },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy HH:mm");
        },
      },

      {
        Header: "Message",
        accessor: "message",
      },
      {
        Header: "Delete",
        disableSortBy: true,
        id: "delete",
        accessor: (str) => "delete",
        Cell: (propsTable) => (
          <button
            className="admin-email__btn-remove"
            onClick={() => {
              const id = propsTable.row.original._id;
              setIdEmail(id);
              setIsOpenModal(true);
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        ),
      },
    ],
    [emailsData]
  );
  const data = useMemo(() => emailsData, [emailsData]);

  return { columns, data };
};

export default useColumnsTableEmails;
