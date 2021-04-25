import React, { useMemo } from "react";

const useColumnsTableOpinions = (
  currentOpinions,
  setIdOpinion,
  setIsOpenModal
) => {
  const columns = useMemo(
    () => [
      { Header: "Name Surname", accessor: "name" },
      {
        Header: "Rate",
        accessor: "rateStar",
      },
      {
        Header: "Image url",
        accessor: "imageUrl",
      },

      {
        Header: "Opinion",
        accessor: "opinion",
      },
      {
        Header: "Delete",
        disableSortBy: true,
        id: "delete",
        accessor: (str) => "delete",
        Cell: (propsTable) => (
          <button
            className="admin-opinions__btn-remove"
            onClick={() => {
              const id = propsTable.row.original._id;
              setIdOpinion(id);
              setIsOpenModal(true);
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        ),
      },
    ],
    [currentOpinions]
  );
  const data = useMemo(() => currentOpinions, [currentOpinions]);

  return { columns, data };
};

export default useColumnsTableOpinions;
