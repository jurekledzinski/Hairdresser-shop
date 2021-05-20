import React, { useEffect, useState } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "../reduxStore/actions/actionFetchAdmin";

const ProtectedRouteAdmin = ({ path, roles, component: Component }) => {
  const dispatch = useDispatch();
  const dataUser = useSelector((store) => store.userData);
  const { users } = dataUser;
  const [islogAdmin, setIsLogAdmin] = useState();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!dataUser.loading) {
      setIsLogAdmin(users);
    }
  }, [users]);

  return (
    <Route
      path={path}
      render={(props) => {
        if (!islogAdmin && typeof users === "object" && dataUser.loading) {
          return <Redirect to="/" />;
        }

        if (
          roles &&
          Boolean(islogAdmin) &&
          roles.indexOf(islogAdmin.role) === -1
        ) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export const ProtectAdmin = withRouter(ProtectedRouteAdmin);
