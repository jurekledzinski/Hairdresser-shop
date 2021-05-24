import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";

import addDays from "date-fns/addDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import { v4 as uuidv4 } from "uuid";

import "./BookingForm.scss";

import { addOrderDetails } from "../../../reduxStore/actions/actionOrderDetails";
import { addSingleExcludTimes } from "../../../reduxStore/actions/actionSingleExcludedTime";

import BookingFormChooseHairDresser from "./BookingFormChooseHairDresser";
import BookingFormDayTime from "./BookingFormDayTime";
import BookingFormChooseService from "./BookingFormChooseService";
import BookingFormNameEmailPhone from "./BookingFormNameEmailPhone";

import validationBookingFormik from "./bookingCustomHooks/validationBookingFormik";

import ErrorSuccessMessage from "../../others/errorSuccessMessages/ErrorSuccessMessages";

const BookingForm = ({
  adminPanelClassLabel,
  adminPanelClassInput,
  adminPanelClassButton,
  adminPanelClassWhere,
  adminPanelClassRedirect,
}) => {
  const dispatch = useDispatch();
  const dataAlert = useSelector((store) => store.alertData);
  const [exludedTimeDate, setExcludedTimeDate] = useState();
  const [choosedTime, setChoosedTime] = useState(null);
  const [disableBtn, setDisableBtn] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [selectServices, setSelectServices] = useState([]);

  const { initialValues, validationSchema } = validationBookingFormik();

  const history = useHistory();

  const onSubmit = async (values, submitProps) => {
    setChoosedTime(values.date);

    let dataService = new Date(values.date);

    let dayEx = dataService.getDate();
    let monthEx = dataService.getMonth();
    let yearEx = dataService.getFullYear();
    let hoursEx = dataService.getHours();
    let minutesEx = dataService.getMinutes();
    let generateCodeCancel = uuidv4();
    let generateBookingId = uuidv4();

    const excludedTimeData = {
      codeCancel: generateCodeCancel,
      isCancel: false,
      timeService: setHours(
        setMinutes(addDays(new Date(yearEx, monthEx, dayEx), 0), minutesEx),
        hoursEx
      ),
      bookingId: generateBookingId,
    };

    setExcludedTimeDate(excludedTimeData);

    let copyValues = values;
    copyValues.bookingId = generateBookingId;
    copyValues.bookTime = values.date;
    adminPanelClassWhere === "adminPanelClassWhere"
      ? (copyValues.bookingWhere = "Shop")
      : (copyValues.bookingWhere = "Website");
    copyValues.cancelCode = generateCodeCancel;
    copyValues.cancelTime = "";
    copyValues.cancelPaymentReturnPercent = "";
    copyValues.dataPayed = new Date();
    copyValues.services = selectServices;

    let subTotal = copyValues.services.reduce(function (acc, curr) {
      return acc + curr.price;
    }, 0);

    let total = copyValues.services.reduce(function (acc, curr) {
      return acc + curr.price + curr.price * 0.19;
    }, 0);

    copyValues.subTotalPrice = subTotal;
    copyValues.totalPrice = Math.round(total * 100) / 100;

    dispatch(addOrderDetails(copyValues));
    dispatch(addSingleExcludTimes(excludedTimeData));

    submitProps.setSubmitting(false);
    submitProps.resetForm();
    setDisableBtn(null);
    setSelectServices([]);

    adminPanelClassRedirect === "adminPanelClassRedirect"
      ? history.push(`/admin/details-appointment/${excludedTimeData.bookingId}`)
      : history.push(`/booking/details/${excludedTimeData.bookingId}`);
  };

  const errorMsg = (props) => {
    return (
      <p
        className={
          Boolean(props.chooseService)
            ? "booking__error-msg booking__error-msg--choose-service"
            : "booking__error-msg"
        }
      >
        {props.children}
      </p>
    );
  };

  useEffect(() => {
    sessionStorage.removeItem("page");
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="booking__form">
            {!Boolean(Object.keys(formik.errors).length) &&
            dataAlert.errorServerMsg ? (
              <ErrorSuccessMessage />
            ) : (
              <ErrorSuccessMessage />
            )}
            <BookingFormChooseHairDresser
              errorMsg={errorMsg}
              adminPanelClassLabel={adminPanelClassLabel}
              adminPanelClassInput={adminPanelClassInput}
            />
            <BookingFormDayTime
              adminPanelClassLabel={adminPanelClassLabel}
              choosedTime={choosedTime}
              disableBtn={disableBtn}
              errorMsg={errorMsg}
              setChoosedTime={setChoosedTime}
              setDisableBtn={setDisableBtn}
            />
            <BookingFormChooseService
              adminPanelClassLabel={adminPanelClassLabel}
              adminPanelClassInput={adminPanelClassInput}
              chooseService="chooseService"
              errorMsg={errorMsg}
              selectServices={selectServices}
              setSelectServices={setSelectServices}
            />
            <BookingFormNameEmailPhone
              adminPanelClassLabel={adminPanelClassLabel}
              adminPanelClassInput={adminPanelClassInput}
              errorMsg={errorMsg}
            />
            <button
              className={
                adminPanelClassButton === "adminPanelClassButton"
                  ? "booking__button-continue--admin"
                  : "booking__button-continue"
              }
              type="submit"
              disabled={
                (formik.isValid && !Boolean(disableBtn)) ||
                (formik.isSubmitting && !Boolean(disableBtn))
              }
            >
              Continue
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BookingForm;
