import React from "react";
import { useDispatch } from "react-redux";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { deleteEmail } from "../../../../utils/sessions";

import { removeEmail } from "../../../../reduxStore/actions/actionEmailsData";

const useRemoveEmail = (idEmail, setIsOpenModal) => {
  const dispatch = useDispatch();

  const handleRemoveItem = async () => {
    const { data, status } = await deleteEmail(idEmail);

    if (status === 200) {
      dispatch(addServerSuccessMessage(data.success, "removeAtTableAdmin"));
      dispatch(removeEmail(idEmail));
      setIsOpenModal(false);
    } else {
      dispatch(addServerErrorMessage(data.alert, "removeAtTableAdmin"));
    }
  };

  return { handleRemoveItem };
};

export default useRemoveEmail;
