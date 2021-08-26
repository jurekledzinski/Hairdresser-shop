import React, { useEffect, useState } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPermissionToRegister } from "../reduxStore/actions/actionFetchPermissionRegister";

const ProtectRegisterRoute = ({ path, component: Component }) => {
  const dispatch = useDispatch();
  const dataPermission = useSelector((store) => store.permissionData);
  const { permission } = dataPermission;
  const [checkPermission, setCheckPermission] = useState();

  useEffect(() => {
    dispatch(fetchPermissionToRegister());
  }, []);

  useEffect(() => {
    if (permission.length > 0) {
      const [checkEnable] = permission;
      setCheckPermission(checkEnable.enableRegisterForm);
    }
  }, [permission]);

  return (
    <Route
      path={path}
      render={(props) => {
        if (!checkPermission && checkPermission !== undefined) {
          return <Redirect to="/" />;
        } else {
          {
            return checkPermission !== undefined && <Component {...props} />;
          }
        }
      }}
    />
  );
};

export const ProtectRegister = withRouter(ProtectRegisterRoute);
