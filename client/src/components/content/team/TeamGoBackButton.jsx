import React from "react";
import { useHistory } from "react-router-dom";

import "./TeamGoBackButton.scss";

const TeamGoBackButton = () => {
  const history = useHistory();

  return (
    <button onClick={() => history.goBack()} className="team__button-go-back">
      Go back
    </button>
  );
};

export default TeamGoBackButton;
