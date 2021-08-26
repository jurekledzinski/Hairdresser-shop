import React from "react";
import "./ControlPrevNextPage.scss";

const ControlPrevNextPage = ({
  canNextPage,
  canPreviousPage,
  nextPage,
  pageIndex,
  pageOptions,
  previousPage,
}) => {
  return (
    <div className="controler-prev-next">
      <span className="controler-prev-next__span">
        <strong className="controler-prev-next__pageIndex">
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </span>
      <button
        className="controler-prev-next__btn"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        Previous
      </button>
      <button
        className="controler-prev-next__btn"
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default ControlPrevNextPage;
