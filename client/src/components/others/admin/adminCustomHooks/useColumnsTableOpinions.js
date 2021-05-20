import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const useColumnsTableOpinions = (setIdOpinion, setIsOpenModal) => {
  const opinionsData = useSelector((store) => store.opinionsDataToUse);
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
    [opinionsData]
  );
  const data = useMemo(() => opinionsData, [opinionsData]);

  return { columns, data };
};

export default useColumnsTableOpinions;
