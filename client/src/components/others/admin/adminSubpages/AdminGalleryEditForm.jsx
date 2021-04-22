import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import { removeFirebaseUrl } from "../../../../reduxStore/actions/actionUrlFirebase";

import "./AdminGalleryEditForm.scss";

import useValidationEditGalleryFormik from "../adminCustomHooks/useValidationEditGalleryFormik";
import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";
import useHandleGalleryEditImage from "../adminCustomHooks/useHandleGalleryEditImage";
import useFirebseDeleteFile from "../../../../customHooks/useFirebaseDeleteFile";
import useDeleteFileFirebase from "../../../../customHooks/useDeleteFileFirebase";
import ErrorSuccessMessage from "../../errorSuccessMessages/ErrorSuccessMessages";
import ProgressBar from "../../progreeBar/ProgressBar";

import { editImagesGallery } from "../../../../utils/sessions";

import useRemoveGalleryImage from "../adminCustomHooks/useRemoveGalleryImage";

const AdminGalleryEditForm = ({
  currentImages,
  idRow,
  imageUrl,
  setCurrentImages,
  setIsVisiblePanel,
  title,
  type,
}) => {
  let editValues = {
    title,
    type,
    fileImg: "",
  };

  const [formValues, setFormValues] = useState(editValues);
  const { initialValues, validationSchema } = useValidationEditGalleryFormik();
  useDeleteErrorMessage();
  const { handleFileEdit } = useHandleGalleryEditImage();
  const { deleteImgFirebase } = useDeleteFileFirebase();

  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);
  const dataFile = useSelector((store) => store.fileDate);
  const dataFirebaseUrl = useSelector((store) => store.firebaseUrlData);

  const [nameFile, setNameFile] = useState(null);

  //   useFirebseDeleteFile(imgLink);
  //   console.log(imageUrl, "stare photo");

  const onSubmit = async (values, submitProps) => {
    delete values.fileImg;

    values.imageUrl = dataFirebaseUrl.firebaseUrl;
    values.id = idRow;

    deleteImgFirebase(imageUrl);

    const { data, status } = await editImagesGallery(values);

    delete data.imageUpdate.__v;

    const { imageUpdate } = data;

    if (status !== 200) {
      dispatch(addServerErrorMessage(data.alert, "default"));
      setNameFile(null);
    } else {
      dispatch(addServerSuccessMessage(data.success, "default"));
      setIsVisiblePanel(false);
      setNameFile(null);

      const editedImage = currentImages.map((item) => {
        if (item._id === imageUpdate._id) {
          return {
            ...item,
            title: imageUpdate.title,
            imageUrl: imageUpdate.imageUrl,
            type: imageUpdate.type,
          };
        }
        return item;
      });

      setCurrentImages(editedImage);
    }

    removeFirebaseUrl();
    submitProps.resetForm();
  };

  useEffect(() => {
    if (Boolean(dataFile.fileImageGalleryEdit)) {
      setNameFile(dataFile.fileImageGalleryEdit.name);
    }
  }, [dataFile]);

  const inputFile = ({ setFieldValue, setFieldTouched }) => (
    <input
      type="file"
      onChange={(e) => handleFileEdit(e, setFieldValue, setFieldTouched)}
      className="admin-gallery__input-file"
    />
  );

  const errorMsg = (props) => {
    return <p className="admin-gallery__error-msg-edit">{props.children}</p>;
  };

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <div className="admin-gallery__edit-form-wrapper">
            {Boolean(dataFile.fileImageGalleryEdit) && <ProgressBar />}
            {!Boolean(Object.keys(formik.errors).length) &&
            dataAlert.errorServerMsg ? (
              <ErrorSuccessMessage />
            ) : (
              <ErrorSuccessMessage />
            )}
            <Form
              className="admin-gallery__form-edit"
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
                className="admin-gallery__form-input"
                placeholder="Title"
              />
              <button
                className="admin-gallery__button-add-image"
                type="submit"
                disabled={!formik.isValid}
              >
                Edit Image
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default AdminGalleryEditForm;
