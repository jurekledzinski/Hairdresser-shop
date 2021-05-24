import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import "./AdminService.scss";

import { adminServiceButtons } from "./AdminServiceButtons";

import { fetchServices } from "../../../../reduxStore/actions/actionFetchServices";
import { removeImageFile } from "../../../../reduxStore/actions/actionFile";
import { projectStorage } from "../../../../firebase/config";

import useHandleServiceImage from "../adminCustomHooks/useHandleServiceImage";
import useFirebseDeleteFile from "../../../../customHooks/useFirebaseDeleteFile";
import useValidationServiceForm from "../adminCustomHooks/useValidationServiceForm";
import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";
import ErrorSuccessMessage from "../../errorSuccessMessages/ErrorSuccessMessages";

import ProgressBar from "../../progreeBar/ProgressBar";

import MessagePopup from "../adminPopUpMessage/MessagePopup";

import AdminServiceRow from "./AdminServiceRow";

import { addAdminService } from "../../../../utils/sessions";

import useRemoveService from "../adminCustomHooks/useRemoveService";

const AdminService = () => {
  const { initialValues, validationSchema } = useValidationServiceForm();
  const { handleFile } = useHandleServiceImage();
  useDeleteErrorMessage();

  const dispatch = useDispatch();
  const adminDateUse = useSelector((store) => store.useAdminData);
  const dataAlert = useSelector((store) => store.alertData);
  const dataFile = useSelector((store) => store.fileDate);
  const dataService = useSelector((store) => store.serviceData);
  const { services } = dataService;
  const [card, setCard] = useState("card 1");
  const [currentServices, setCurrentServices] = useState([]);
  const [idService, setIdService] = useState("");
  const [chooseGenderBtn, setChooseGenderBtn] = useState(false);
  const [gender, setGender] = useState("men");
  const [indexCard, setIndexCard] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [nameFile, setNameFile] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const imgUrl = useRef(null);
  const imgLink = useRef(null);
  const imamgeNewEditLink = useRef(null);

  const history = useHistory();

  useFirebseDeleteFile(imgLink);

  const { handleRemoveItem } = useRemoveService(
    currentServices,
    idService,
    imgUrl,
    setCurrentServices,
    setIsOpenModal
  );

  const onSubmit = async (values, submitProps) => {
    delete values.fileImg;
    values.gender = gender;
    values.card = card;
    values.imageUrl = imgLink.current;

    const { data, status } = await addAdminService(values);

    const { service } = data;

    delete service.__v;

    if (status !== 200) {
      dispatch(addServerErrorMessage(data.alert, "default"));
      setNameFile(null);
    } else {
      dispatch(addServerSuccessMessage(data.success, "default"));
      setCurrentServices([...currentServices, service]);
      setNameFile(null);
    }
    imgLink.current = null;
    submitProps.resetForm();
  };

  const handleChooseImages = (e, index) => {
    let textBtn = e.target.innerHTML.toLowerCase();
    setCard(textBtn);
    setIndexCard(index);
  };

  const handleNotRemoveItem = () => {
    setIsOpenModal(false);
    setIdService("");
  };

  const handleButtonMen = () => {
    setChooseGenderBtn(false);
    setGender("men");
    setIndexCard(0);
    setCard("card 1");
  };

  const handleButtonWomen = () => {
    setChooseGenderBtn(true);
    setGender("women");
    setIndexCard(0);
    setCard("card 1");
  };

  useEffect(() => {
    if (Boolean(dataFile.fileImageService)) {
      setNameFile(dataFile.fileImageService.name);
    }
  }, [dataFile]);

  useEffect(() => {
    let type = {
      gender,
      card,
    };
    dispatch(fetchServices(type));
  }, [card, dispatch, gender]);

  useEffect(() => {
    setCurrentServices(services);
  }, [services]);

  useEffect(() => {
    const fireBaseUrlStorage = "firebasestorage";
    history.listen(() => {
      if (
        history.location.pathname !== "/admin/service" &&
        imamgeNewEditLink.current &&
        imamgeNewEditLink.current.indexOf(fireBaseUrlStorage) !== -1
      ) {
        const image = projectStorage.refFromURL(imamgeNewEditLink.current);
        imamgeNewEditLink.current = null;

        dispatch(removeImageFile(null, null, null, null, null, null));
        image
          .delete()
          .then((responese) => responese)
          .catch((err) => {
            setErrMsg(err);
          });
      }
    });
  }, [isSubmit, imamgeNewEditLink.current]);

  const inputFile = ({ setFieldValue, setFieldTouched }) => (
    <input
      type="file"
      onChange={(e) => handleFile(e, setFieldValue, setFieldTouched)}
      className="admin-service__input-file"
    />
  );

  const errorMsg = (props) => {
    return <p className="admin-service__error-msg">{props.children}</p>;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <article className="admin-service">
            <div className="admin-service__wrapper">
              <div className="admin-service__wrapper-buttons">
                <button
                  className={
                    chooseGenderBtn
                      ? "admin-service__button"
                      : "admin-service__button admin-service__button--active"
                  }
                  onClick={handleButtonMen}
                >
                  Men
                </button>
                <button
                  className={
                    chooseGenderBtn
                      ? "admin-service__button admin-service__button--active"
                      : "admin-service__button"
                  }
                  onClick={handleButtonWomen}
                >
                  Women
                </button>
                {adminServiceButtons.map((item, index) => (
                  <button
                    className={
                      indexCard === index
                        ? `${item.activeNameClass} ${item.nameClass}`
                        : item.nameClass
                    }
                    key={index}
                    onClick={(e) => handleChooseImages(e, index)}
                  >
                    {item.nameTxt}
                  </button>
                ))}
              </div>
              {Boolean(dataFile.fileImageService) && (
                <ProgressBar imgLink={imgLink} />
              )}
              {!Boolean(Object.keys(formik.errors).length) &&
              dataAlert.errorServerMsg ? (
                <ErrorSuccessMessage />
              ) : (
                <ErrorSuccessMessage />
              )}
              {Boolean(currentServices) && currentServices.length < 4 && (
                <Form
                  className="admin-service__wrapper-form-add"
                  onSubmit={formik.handleSubmit}
                >
                  <ErrorMessage name="fileImg" component={errorMsg} />
                  <div className="admin-service__input-file-add">
                    <label className="admin-service__label-file">
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
                      <span className="admin-service__file-name">
                        {nameFile}
                      </span>
                    ) : (
                      <span className="admin-service__file-name">
                        No file ...
                      </span>
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
                    disabled={
                      adminDateUse.enableServices ? !formik.isValid : true
                    }
                  >
                    Add Service
                  </button>
                </Form>
              )}
              <div className="admin-service__header">
                <p className="admin-service__number">
                  Total number:{" "}
                  {Boolean(currentServices) ? currentServices.length : null}
                </p>
                <p className="admin-service__action">Action</p>
              </div>
              <div className="admin-service__wrapper-images">
                {Boolean(currentServices) &&
                  currentServices.map((item, index) => (
                    <AdminServiceRow
                      key={item._id}
                      {...item}
                      setIdService={setIdService}
                      idService={idService}
                      imgUrl={imgUrl}
                      setIsOpenModal={setIsOpenModal}
                      currentServices={currentServices}
                      setCurrentServices={setCurrentServices}
                      setIsSubmit={setIsSubmit}
                      imamgeNewEditLink={imamgeNewEditLink}
                    />
                  ))}
              </div>
            </div>
            <MessagePopup
              enableAction={adminDateUse.enableServices}
              isOpenModal={isOpenModal}
              handleRemoveItem={handleRemoveItem}
              handleNotRemoveItem={handleNotRemoveItem}
              purpose="service"
            />
          </article>
        );
      }}
    </Formik>
  );
};

export default AdminService;
