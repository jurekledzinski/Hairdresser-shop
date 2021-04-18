import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import "./InternalServerError.scss";

const InternalServerError = () => {
  const serverError = useSelector((store) => store.serverErrorData);
  const { statusCode } = serverError;

  const history = useHistory();
  const timeOutClear = useRef();

  console.log(serverError);

  const handleReloadPage = () => {
    if (history.location.pathname !== "/") {
      history.push("/");
      timeOutClear.current = setTimeout(() => window.location.reload(), 100);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeOutClear.current);
  }, []);

  return (
    <section>
      {statusCode === 500 ? (
        <div className="server-error">
          <div className="server-error__wrapper">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hairdress-shop.appspot.com/o/500-internal-server-error.jpg?alt=media&token=7a4d6435-8472-42dc-95f6-f8f022d6ad1e"
              alt=""
              className="server-error__image"
            />
            {history.location.pathname !== "/" && (
              <button
                className="server-error__button"
                onClick={() => handleReloadPage()}
              >
                Back home
              </button>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default InternalServerError;
