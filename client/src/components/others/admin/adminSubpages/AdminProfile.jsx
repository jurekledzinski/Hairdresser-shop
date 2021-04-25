import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./AdminProfile.scss";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

// import { fetchGalleryImgs } from "../../../../reduxStore/actions/actionFetchGalleryImages";

import useValidationFormikUpdateProfile from "../adminCustomHooks/useValidationFormikUpdateProfile";
import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";
import useHandleUpdateProfileImage from "../adminCustomHooks/useHandleUpdateProfileImage";
import useFirebseDeleteFile from "../../../../customHooks/useFirebaseDeleteFile";
import useDeleteFileFirebase from "../../../../customHooks/useDeleteFileFirebase";
import ErrorSuccessMessage from "../../errorSuccessMessages/ErrorSuccessMessages";

import ProgressBar from "../../progreeBar/ProgressBar";

import { updateAdmin } from "../../../../utils/sessions";

const AdminProfile = () => {
  const [formValues, setFormValues] = useState("");
  const {
    initialValues,
    validationSchema,
  } = useValidationFormikUpdateProfile();
  useDeleteErrorMessage();
  const { handleFileEdit } = useHandleUpdateProfileImage();
  const { deleteImgFirebase } = useDeleteFileFirebase();

  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);
  const dataFile = useSelector((store) => store.fileDate);

  const [currentAdminData, setCurrentAdminData] = useState([]);
  const [nameFile, setNameFile] = useState(null);

  const imgLink = useRef(null);

  useFirebseDeleteFile(imgLink);

  console.log(dataFile, "admin profile file data");
  console.log(imgLink, " url zdjecia");

  const onSubmit = async (values, submitProps) => {
    delete values.fileImg;

    if (Boolean(imgLink.current)) {
      values.imageUrl = imgLink.current;
    }

    console.log(values, "values update");
    // tu trzeba przeslax id admina plus nowe dane zmienione

    // const { data, status } = await updateAdmin(values);

    // delete data.updateAdmin.__v;

    // const { updateAdmin } = data;

    // if (status !== 200) {
    //   dispatch(addServerErrorMessage(data.alert, "registerForm"));
    //   setNameFile(null);
    // } else {
    //   dispatch(addServerSuccessMessage(data.success, "registerForm"));
    //   setNameFile(null);
    //   link starego zdjecia
    //   deleteImgFirebase(imageUrl);

    //   const editedAdmin = currentAdminData.map((item) => {
    //     if (item._id === updateAdmin._id) {
    //       return {
    //         ...item,
    //         name: updateAdmin.name,
    //         lastName: updateAdmin.lastName,
    //         email: updateAdmin.email,
    //         imageUrl: updateAdmin.imageUrl,
    //         password: updateAdmin.password,
    //       };
    //     }
    //     return item;
    //   });

    //   setCurrentAdminData(editedAdmin);

    //   let editValues = {
    //     name: updateAdmin.name,
    //     lastName: updateAdmin.lastName,
    //     email: updateAdmin.email,
    //     imageUrl: updateAdmin.imageUrl,
    //     password: updateAdmin.password,
    //   };
    //   setFormValues(editValues);
    // }
    imgLink.current = null;
    submitProps.resetForm();
  };

  useEffect(() => {
    if (Boolean(dataFile.fileImageEditProfile)) {
      setNameFile(dataFile.fileImageEditProfile.name);
    }
  }, [dataFile]);

  const inputFile = ({ setFieldValue, setFieldTouched }) => (
    <input
      type="file"
      onChange={(e) => handleFileEdit(e, setFieldValue, setFieldTouched)}
      className="admin-profile__input-file"
    />
  );

  const errorMsg = (props) => {
    return <p className="admin-profile__error-msg">{props.children}</p>;
  };

  return (
    <article className="admin-profile">
      <div className="admin-profile__wrapper">
        <div className="admin-profile__left-side">
          <div className="admin-profile__wrapper-title">
            <p className="admin-profile__title">Update profile</p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <section className="admin-profile__edit">
                  <div className="admin-profile__edit-wrapper">
                    <div className="admin-profile__inner-wrapper">
                      <Form className="admin-profile__form">
                        {Boolean(dataFile.fileImageEditProfile) && (
                          <ProgressBar imgLink={imgLink} />
                        )}
                        {!Boolean(Object.keys(formik.errors).length) &&
                        dataAlert.errorServerMsg ? (
                          <ErrorSuccessMessage />
                        ) : (
                          <ErrorSuccessMessage />
                        )}
                        <div className="admin-profile__input-wrapper-name-surname">
                          <div className="admin-profile__wrapper-name">
                            <ErrorMessage name="name" component={errorMsg} />
                            <label className="admin-profile__label">
                              First name
                            </label>
                            <Field
                              className="admin-profile__input"
                              name="name"
                              type="text"
                              placeholder="Your name"
                            />
                            <span className="admin-profile__icon">
                              <i className="far fa-user"></i>
                            </span>
                          </div>
                          <div className="admin-profile__wrapper-surname">
                            <ErrorMessage
                              name="lastName"
                              component={errorMsg}
                            />
                            <label className="admin-profile__label">
                              Last name
                            </label>
                            <Field
                              className="admin-profile__input"
                              name="lastName"
                              type="text"
                              placeholder="Your last name"
                            />
                            <span className="admin-profile__icon">
                              <i className="far fa-user"></i>
                            </span>
                          </div>
                        </div>

                        <div className="admin-profile__input-wrapper">
                          <ErrorMessage name="email" component={errorMsg} />
                          <label className="admin-profile__label">Email</label>
                          <Field
                            className="admin-profile__input"
                            name="email"
                            type="email"
                            placeholder="Your email"
                          />
                          <span className="admin-profile__icon">
                            <i className="far fa-envelope"></i>
                          </span>
                        </div>
                        <div className="admin-profile__input-file-add">
                          <ErrorMessage name="fileImg" component={errorMsg} />
                          <label className="admin-profile__label-file">
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
                            <span className="admin-profile__file-name">
                              {nameFile}
                            </span>
                          ) : (
                            <span className="admin-profile__file-name">
                              No file ...
                            </span>
                          )}
                        </div>
                        <div className="admin-profile__input-wrapper">
                          <ErrorMessage name="password" component={errorMsg} />
                          <label className="admin-profile__label">
                            Password
                          </label>
                          <Field
                            className="admin-profile__input"
                            name="password"
                            type="text"
                            placeholder="Your password"
                          />
                          <span className="admin-profile__icon">
                            <i className="fas fa-lock"></i>
                          </span>
                        </div>
                        <div className="admin-profile__input-wrapper">
                          <ErrorMessage
                            name="confirmPassword"
                            component={errorMsg}
                          />
                          <label className="admin-profile__label">
                            Confirm Password
                          </label>
                          <Field
                            className="admin-profile__input"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                          />
                          <span className="admin-profile__icon">
                            <i className="fas fa-eye"></i>
                          </span>
                        </div>
                        <button
                          className="admin-profile__button-update"
                          type="submit"
                          disabled={!formik.isValid}
                        >
                          Update Profile
                        </button>
                      </Form>
                    </div>
                  </div>
                </section>
              );
            }}
          </Formik>
        </div>
        <div className="admin-profile__right-side">
          <div className="admin-profile__wrapper-title">
            <p className="admin-profile__title">Control premission</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AdminProfile;
