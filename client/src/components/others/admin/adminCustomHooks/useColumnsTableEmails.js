import React, { useMemo } from "react";

const useColumnsTableEmails = (currentEmails, setIdEmail, setIsOpenModal) => {
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
    [currentEmails]
  );
  const data = useMemo(() => currentEmails, [currentEmails]);

  return { columns, data };
};

export default useColumnsTableEmails;
