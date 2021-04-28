import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import "./AdminShopEditForm.scss";

import useValidationOpenShopFormEdit from "../adminCustomHooks/useValidationOpenShopFormEdit";
import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";
import ErrorSuccessMessage from "../../errorSuccessMessages/ErrorSuccessMessages";

import { editAdminOpenShop } from "../../../../utils/sessions";

const AdminShopEditForm = ({
  currentOpenShop,
  idRow,
  setCurrentOpenShop,
  setIsVisiblePanel,
  day,
  time,
}) => {
  let editValues = {
    day,
    time,
  };

  console.log(day, time, " edit");
  const [formValues, setFormValues] = useState(editValues);
  const { initialValues, validationSchema } = useValidationOpenShopFormEdit();
  useDeleteErrorMessage();

  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);

  console.log(formValues, " formValues edit");

  const onSubmit = async (values, submitProps) => {
    values.id = idRow;

    const { data, status } = await editAdminOpenShop(values);

    console.log(data, status);

    const { openshop } = data;

    console.log(openshop, " edit openshop");

    if (status !== 200) {
      dispatch(addServerErrorMessage(data.alert, "default"));
    } else {
      dispatch(addServerSuccessMessage(data.success, "default"));
      setIsVisiblePanel(false);

      const editedOpenShop = currentOpenShop.map((item) => {
        if (item._id === openshop._id) {
          return {
            ...item,
            day: openshop.day,
            time: openshop.time,
          };
        }
        return item;
      });

      setCurrentOpenShop(editedOpenShop);

      let editValues = {
        day: openshop.day,
        time: openshop.time,
      };
      setFormValues(editValues);
    }
    submitProps.resetForm();
  };

  const errorMsg = (props) => {
    return <p className="admin-shop__error-msg-edit">{props.children}</p>;
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <div className="admin-shop__edit-form-wrapper">
            {!Boolean(Object.keys(formik.errors).length) &&
            dataAlert.errorServerMsg ? (
              <ErrorSuccessMessage />
            ) : (
              <ErrorSuccessMessage />
            )}
            <Form
              className="admin-shop__form-edit"
              onSubmit={formik.handleSubmit}
            >
              <ErrorMessage name="day" component={errorMsg} />
              <Field
                type="text"
                name="day"
                className="admin-shop__form-input"
                placeholder="Day"
              />
              <ErrorMessage name="time" component={errorMsg} />
              <Field
                type="text"
                name="time"
                className="admin-shop__form-input"
                placeholder="Time"
              />
              <button
                className="admin-shop__button-add-image"
                type="submit"
                disabled={!formik.isValid}
              >
                Edit Open Time
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default AdminShopEditForm;
