import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./AdminProfilePermission.scss";

import { fetchPermissionToRegister } from "../../../../reduxStore/actions/actionFetchPermissionRegister";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { addEnableRegisterPermission } from "../../../../utils/sessions";

import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";
import ErrorSuccessMessage from "../../errorSuccessMessages/ErrorSuccessMessages";

const AdminProfilePermission = () => {
  const dispatch = useDispatch();
  const adminDateUse = useSelector((store) => store.useAdminData);
  const dataPermission = useSelector((store) => store.permissionData);
  const { permission } = dataPermission;
  const [checked, setChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useDeleteErrorMessage();

  const handleEnablePermissionRegister = async (e) => {
    e.preventDefault();

    const enableRegister = {
      enableRegisterForm: checked,
    };

    const { data, status } = await addEnableRegisterPermission(enableRegister);

    if (status === 200) {
      dispatch(addServerSuccessMessage(data.success, "enableRegister"));
    } else {
      dispatch(addServerErrorMessage(data.alert, "enableRegister"));
    }
    setIsDisabled(true);
  };

  const handleChangePermission = () => {
    setChecked((prevValue) => !prevValue);
    setIsDisabled(false);
  };

  useEffect(() => {
    dispatch(fetchPermissionToRegister());
  }, []);

  useEffect(() => {
    if (permission.length > 0) {
      const [checkEnable] = permission;
      setChecked(checkEnable.enableRegisterForm);
    }
  }, [permission]);

  return (
    <div className="admin-profile__enable-register">
      <ErrorSuccessMessage />
      <form
        className="admin-profile__permission-register"
        onSubmit={handleEnablePermissionRegister}
      >
        <label htmlFor="enableRegister" className="admin-profile__enable-label">
          <input
            type="checkbox"
            id="enableRegister"
            className="admin-profile__enable-input"
            onChange={handleChangePermission}
            checked={checked}
          />
          Enable registration
        </label>
        {!isDisabled && (
          <button
            className="admin-profile__button-confirm"
            disabled={adminDateUse.enablePermission ? false : true}
          >
            Confirm
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminProfilePermission;
