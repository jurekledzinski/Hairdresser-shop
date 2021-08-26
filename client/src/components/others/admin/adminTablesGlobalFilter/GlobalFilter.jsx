import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

import "./GlobalFilter.scss";

const GlobalFilter = ({ filter, setFilter, data }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 300);

  return (
    <div className="table-search">
      <input
        className="table-search__input"
        placeholder="Search..."
        type="text"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <span className="table-search__amount-courses">{`Total number: ${data.length}`}</span>
    </div>
  );
};

export default GlobalFilter;
