import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import "./AdminServiceEditForm.scss";

import useValidationServiceFormEdit from "../adminCustomHooks/useValidationServiceFormEdit";
import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";

import { editAdminService } from "../../../../utils/sessions";

const AdminServiceEditForm = ({
  currentServices,
  idRow,
  setCurrentServices,
  setIsVisiblePanel,
  title,
  price,
}) => {
  let editValues = {
    title,
    price,
  };

  const [formValues, setFormValues] = useState(editValues);
  const { initialValues, validationSchema } = useValidationServiceFormEdit();
  useDeleteErrorMessage();

  const dispatch = useDispatch();

  console.log(formValues, " formValues edit");

  const onSubmit = async (values, submitProps) => {
    values.id = idRow;

    const { data, status } = await editAdminService(values);

    const { service } = data;

    if (status !== 200) {
      dispatch(addServerErrorMessage(data.alert, "default"));
    } else {
      dispatch(addServerSuccessMessage(data.success, "default"));
      setIsVisiblePanel(false);

      const editedService = currentServices.map((item) => {
        if (item._id === service._id) {
          return {
            ...item,
            title: service.title,
            price: service.price,
          };
        }
        return item;
      });

      setCurrentServices(editedService);

      let editValues = {
        title: service.title,
        price: service.price,
      };
      setFormValues(editValues);
    }
    submitProps.resetForm();
  };

  const errorMsg = (props) => {
    return <p className="admin-service__error-msg-edit">{props.children}</p>;
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
          <div className="admin-service__edit-form-wrapper">
            <Form
              className="admin-service__form-edit"
              onSubmit={formik.handleSubmit}
            >
              <ErrorMessage name="title" component={errorMsg} />
              <Field
                type="text"
                name="title"
                className="admin-service__form-input"
                placeholder="Title"
              />
              <ErrorMessage name="price" component={errorMsg} />
              <Field
                type="number"
                name="price"
                className="admin-service__form-input"
                placeholder="Price"
                min="1"
                step="any"
              />
              <button
                className="admin-service__button-add-image"
                type="submit"
                disabled={!formik.isValid}
              >
                Edit Service
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default AdminServiceEditForm;
