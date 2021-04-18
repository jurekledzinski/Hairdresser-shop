import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  removeServerErrorMessage,
  removeServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

const useRemoveErrorMessage = () => {
  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);

  const idTimeout = useRef(null);

  useEffect(() => {
    if (dataAlert.successServerMsg || dataAlert.errorServerMsg) {
      setTimeout(() => {
        idTimeout.current = dispatch(removeServerSuccessMessage(null, null));
        idTimeout.current = dispatch(removeServerErrorMessage(null, null));
      }, 1000);
    }

    return () => clearTimeout(idTimeout.current);
  }, [dataAlert.errorServerMsg, dataAlert.successServerMsg]);
};

export default useRemoveErrorMessage;
