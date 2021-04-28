import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  addServerErrorMessage,
  addServerSuccessMessage,
} from "../../../../reduxStore/actions/actionAlertsMessages";

import "./AdminShop.scss";

import { fetchOpenShop } from "../../../../reduxStore/actions/actionFetchOpenShop";

import useValidationShopForm from "../adminCustomHooks/useValidationShopForm";
import useDeleteErrorMessage from "../../../../customHooks/useDeleteErrorMessage";
import ErrorSuccessMessage from "../../errorSuccessMessages/ErrorSuccessMessages";

import MessagePopup from "../adminPopUpMessage/MessagePopup";

import AdminShopRow from "./AdminShopRow";

import { addAdminOpenShop } from "../../../../utils/sessions";

import useRemoveOpenShop from "../adminCustomHooks/useRemoveOpenShop";

const AdminShop = () => {
  const { initialValues, validationSchema } = useValidationShopForm();
  useDeleteErrorMessage();

  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);
  const dataOpenShop = useSelector((store) => store.openShopData);
  const { shop } = dataOpenShop;
  const [currentOpenShop, setCurrentOpenShop] = useState([]);
  const [idOpenShop, setIdOpenShop] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  console.log(currentOpenShop, "currentSopenshop");

  const { handleRemoveItem } = useRemoveOpenShop(
    currentOpenShop,
    idOpenShop,
    setCurrentOpenShop,
    setIsOpenModal
  );

  const onSubmit = async (values, submitProps) => {
    console.log(values);

    const { data, status } = await addAdminOpenShop(values);

    const { openshop } = data;

    delete openshop.__v;

    if (status !== 200) {
      dispatch(addServerErrorMessage(data.alert, "default"));
    } else {
      dispatch(addServerSuccessMessage(data.success, "default"));
      setCurrentOpenShop([...currentOpenShop, openshop]);
    }
    submitProps.resetForm();
  };

  const handleNotRemoveItem = () => {
    setIsOpenModal(false);
    setIdOpenShop("");
  };

  useEffect(() => {
    dispatch(fetchOpenShop());
  }, [dispatch]);

  useEffect(() => {
    setCurrentOpenShop(shop);
  }, [shop]);

  const errorMsg = (props) => {
    return <p className="admin-shop__error-msg">{props.children}</p>;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <article className="admin-shop">
            <div className="admin-shop__wrapper">
              {!Boolean(Object.keys(formik.errors).length) &&
              dataAlert.errorServerMsg ? (
                <ErrorSuccessMessage />
              ) : (
                <ErrorSuccessMessage />
              )}
              {Boolean(currentOpenShop) && currentOpenShop.length < 7 && (
                <Form
                  className="admin-shop__wrapper-form-add"
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
                    Add Open Time
                  </button>
                </Form>
              )}
              <div className="admin-shop__header">
                <p className="admin-shop__number">
                  Total number:{" "}
                  {Boolean(currentOpenShop) ? currentOpenShop.length : null}
                </p>
                <p className="admin-shop__action">Action</p>
              </div>
              <div className="admin-shop__wrapper-images">
                {Boolean(currentOpenShop) &&
                  currentOpenShop.map((item, index) => (
                    <AdminShopRow
                      key={item._id}
                      {...item}
                      setIdOpenShop={setIdOpenShop}
                      idOpenShop={idOpenShop}
                      setIsOpenModal={setIsOpenModal}
                      currentOpenShop={currentOpenShop}
                      setCurrentOpenShop={setCurrentOpenShop}
                    />
                  ))}
              </div>
            </div>
            <MessagePopup
              isOpenModal={isOpenModal}
              handleRemoveItem={handleRemoveItem}
              handleNotRemoveItem={handleNotRemoveItem}
              purpose="day"
            />
          </article>
        );
      }}
    </Formik>
  );
};

export default AdminShop;
