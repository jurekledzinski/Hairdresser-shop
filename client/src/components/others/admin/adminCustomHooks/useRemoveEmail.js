import React from "react";
import { useDispatch } from "react-redux";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { deleteEmail } from "../../../../utils/sessions";

const useRemoveEmail = (
  currentEmails,
  idEmail,
  setCurrentEmails,
  setIsOpenModal
) => {
  const dispatch = useDispatch();

  const deepCopyCurrentEmails = () => {
    let copy = [];
    currentEmails.forEach((item) => {
      const singleItem = { ...item };
      copy = [...copy, singleItem];
    });

    return copy;
  };

  const handleRemoveItem = async () => {
    const { data, status } = await deleteEmail(idEmail);

    if (status === 200) {
      dispatch(addServerSuccessMessage(data.success, "removeAtTableAdmin"));
      let newCopy = deepCopyCurrentEmails();
      const updatedEmails = newCopy.filter((item) => item._id !== idEmail);
      setCurrentEmails(updatedEmails);
      setIsOpenModal(false);
    } else {
      dispatch(addServerErrorMessage(data.alert, "removeAtTableAdmin"));
    }
  };

  return { handleRemoveItem };
};

export default useRemoveEmail;
