import React from "react";
import {  useHistory } from "react-router-dom";

import "./ButtonGoBackLoginRegister.scss";

const ButtonGoBackLoginRegister = () => {
  const history = useHistory();

  return (
    <button onClick={() => history.push("/")} className="button-go-back">
      Go back
    </button>
  );
};

export default ButtonGoBackLoginRegister;
