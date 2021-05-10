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
import useHandleEditService from "../adminCustomHooks/useHandleEditService";
import useFirebseDeleteFile from "../../../../customHooks/useFirebaseDeleteFile";
import useDeleteFileFirebase from "../../../../customHooks/useDeleteFileFirebase";
import ProgressBar from "../../progreeBar/ProgressBar";

import { editAdminService } from "../../../../utils/sessions";

const AdminServiceEditForm = ({
  currentServices,
  idRow,
  imageUrl,
  setCurrentServices,
  setIsVisiblePanel,
  title,
  price,
}) => {
  let editValues = {
    title,
    price,
    fileImg: "",
  };
  const dispatch = useDispatch();
  const adminDateUse = useSelector((store) => store.useAdminData);
  const dataFile = useSelector((store) => store.fileDate);

  const [formValues, setFormValues] = useState(editValues);
  const { initialValues, validationSchema } = useValidationServiceFormEdit();
  useDeleteErrorMessage();
  const { handleEditServiceFile } = useHandleEditService();
  const { deleteImgFirebase } = useDeleteFileFirebase();

  const [nameFile, setNameFile] = useState(null);

  const imgLink = useRef(null);

  useFirebseDeleteFile(imgLink);

  const onSubmit = async (values, submitProps) => {
    delete values.fileImg;
    values.id = idRow;
    values.imageUrl = imgLink.current;

    const { data, status } = await editAdminService(values);

    const { service } = data;

    if (status !== 200) {
      dispatch(addServerErrorMessage(data.alert, "default"));
      setNameFile(null);
    } else {
      dispatch(addServerSuccessMessage(data.success, "default"));
      setIsVisiblePanel(false);
      setNameFile(null);
      deleteImgFirebase(imageUrl);

      const editedService = currentServices.map((item) => {
        if (item._id === service._id) {
          return {
            ...item,
            imageUrl: service.imageUrl,
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
        fileImg: "",
      };
      setFormValues(editValues);
    }
    imgLink.current = null;
    submitProps.resetForm();
  };

  useEffect(() => {
    if (Boolean(dataFile.fileEditImageService)) {
      setNameFile(dataFile.fileEditImageService.name);
    }
  }, [dataFile]);

  const inputFile = ({ setFieldValue, setFieldTouched }) => (
    <input
      type="file"
      onChange={(e) => handleEditServiceFile(e, setFieldValue, setFieldTouched)}
      className="admin-gallery__input-file"
    />
  );

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
            {Boolean(dataFile.fileEditImageService) && (
              <ProgressBar imgLink={imgLink} />
            )}
            <Form
              className="admin-service__form-edit"
              onSubmit={formik.handleSubmit}
            >
              <ErrorMessage name="fileImg" component={errorMsg} />
              <div className="admin-gallery__input-file-add">
                <label className="admin-gallery__label-file">
                  Choose File
                  <Field
                    as={inputFile}
                    name="fileImg"
                    type="file"
                    setFieldValue={formik.setFieldValue}
                    setFieldTouched={formik.setFieldTouched}
                  ></Field>
                </label>
                {nameFile ? (
                  <span className="admin-gallery__file-name">{nameFile}</span>
                ) : (
                  <span className="admin-gallery__file-name">No file ...</span>
                )}
              </div>
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
                disabled={adminDateUse.enableServices ? !formik.isValid : true}
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
