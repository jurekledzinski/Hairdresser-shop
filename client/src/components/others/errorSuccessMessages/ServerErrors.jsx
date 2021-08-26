import React from "react";
import { useSelector } from "react-redux";

import InternalServerError from "../internalServerError/InternalServerError";

const ServerError = ({ children }) => {
  let serverError = useSelector((store) => store.serverErrorData);
  const { where } = serverError;

  switch (where) {
    case "Internal server error":
      return <InternalServerError />;
    default:
      return children;
  }
};

export default ServerError;
