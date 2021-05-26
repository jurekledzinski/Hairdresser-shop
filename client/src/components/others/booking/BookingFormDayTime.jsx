import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, ErrorMessage } from "formik";
import addMonths from "date-fns/addMonths";
import getDay from "date-fns/getDay";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import subDays from "date-fns/subDays";
import isSameDay from "date-fns/isSameDay";
import DatePicker from "react-datepicker";

import "./BookingFormDayTime.scss";

import { deleteExcludedTimesExpired } from "../.././../utils/sessions";

import { addExcludTimes } from "../../../reduxStore/actions/actionExcludedTimes";
import { fetchAllTimesExcluded } from "../../../reduxStore/actions/actionFetchExcludedTimes";

import "react-datepicker/dist/react-datepicker.css";

const BookingFormDayTime = ({
  adminPanelClassLabel,
  choosedTime,
  errorMsg,
  setDisableBtn,
}) => {
  const dispatch = useDispatch();
  const dataAllExcludedTimes = useSelector((store) => store.excludedTimesData);
  const dataAllExTimes = useSelector((store) => store.allFetchExTimesData);

  const rangeTime = useRef([]);
  const currentTimes = useRef([]);

  const [allExcludeDays, setAllExcludeDays] = useState([]);
  const [currentExcludedDays, setCurrentExcludedDays] = useState([]);
  const [choosedDay, setChoosedDay] = useState();
  const [isDisableTime, setIsDisableTime] = useState(true);

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0;
  };

  const getExcludeTimesForDate = (date) => {
    return dataAllExcludedTimes.filter((time) =>
      isSameDay(date, time.timeService)
    );
  };

  const [excludeTimes, setExcludeTimes] = useState(
    getExcludeTimesForDate(choosedTime)
  );

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    if (!rangeTime.current.includes(time.toString())) {
      rangeTime.current = [...rangeTime.current, time.toString()];
    }

    rangeTime.current.forEach((item) => {
      if (
        new Date(item).toDateString() === new Date().toDateString() &&
        new Date(item).getTime() >= currentDate.getTime()
      ) {
        if (!currentTimes.current.includes(item)) {
          currentTimes.current = [...currentTimes.current, item];
        }
      }
    });

    return currentDate.getTime() < selectedDate.getTime();
  };

  const createCurrentTimesServices = () => {
    let incMinutes = 2400000;
    let startTimeService = new Date().setHours(8, 0, 0, 0);
    const endTimeService = new Date().setHours(19, 0, 0, 0);

    let timesArray = [];

    while (startTimeService < endTimeService) {
      timesArray = [...timesArray, new Date(startTimeService)];
      startTimeService = startTimeService + incMinutes;
    }

    const filterArray = timesArray.filter((item) => item > new Date());

    let restTimesArr = [];

    filterArray.forEach((item) => {
      restTimesArr = [...restTimesArr, item.getTime()];
    });

    let excludTimesArr = [];

    dataAllExcludedTimes.forEach((item) => {
      excludTimesArr = [...excludTimesArr, item.timeService.getTime()];
    });

    const checkIsCurrentDayIsDisable = restTimesArr.filter(
      (d) => !excludTimesArr.includes(d)
    );

    return { checkIsCurrentDayIsDisable };
  };

  useEffect(() => {
    const groupBy = (xs) => {
      return xs.reduce(function (rv, x) {
        (rv[
          `${x.timeService?.getDate()}.${x.timeService?.getMonth()}.${x.timeService?.getFullYear()}`
        ] =
          rv[
            `${x.timeService?.getDate()}.${x.timeService?.getMonth()}.${x.timeService?.getFullYear()}`
          ] || []).push(x);
        return rv;
      }, {});
    };

    let excludeDate = groupBy(dataAllExcludedTimes);

    let getKeys = Object.keys(excludeDate);

    const { checkIsCurrentDayIsDisable } = createCurrentTimesServices();

    const dayToday = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`;

    let whenAllExcTimesInCurrentDay;

    let arrayExcludedDates = getKeys.filter((item) => {
      if (excludeDate[item].length === 17) {
        return excludeDate[item];
      } else if (item === dayToday && checkIsCurrentDayIsDisable.length === 0) {
        return excludeDate[item];
      } else if (checkIsCurrentDayIsDisable.length === 0) {
        whenAllExcTimesInCurrentDay = dayToday;
        alert(
          whenAllExcTimesInCurrentDay,
          "checkIsCurrentDayIsDisable.length===0"
        );
      }

      return null;
    });

    if (checkIsCurrentDayIsDisable.length === 0 && new Date()) {
      whenAllExcTimesInCurrentDay = dayToday;
    }

    if (whenAllExcTimesInCurrentDay) {
      arrayExcludedDates = [
        ...arrayExcludedDates,
        `${whenAllExcTimesInCurrentDay}`,
      ];
    }

    alert(whenAllExcTimesInCurrentDay);

    setAllExcludeDays(arrayExcludedDates);
  }, [dataAllExcludedTimes]);

  useEffect(() => {
    let exlDays = [];

    allExcludeDays.forEach((item) => {
      let indexDot1 = item.indexOf(".");
      let day = item.slice(0, indexDot1);
      let month = item.slice(indexDot1 + 1, item.lastIndexOf("."));
      let year = item.slice(item.lastIndexOf(".") + 1);

      if (!exlDays.includes(subDays(new Date(year, month, day), 0))) {
        exlDays = [...exlDays, subDays(new Date(year, month, day), 0)];
      }
    });

    setCurrentExcludedDays(exlDays);
  }, [allExcludeDays]);

  useEffect(() => {
    dispatch(fetchAllTimesExcluded());
  }, [dispatch]);

  useEffect(() => {
    if (
      dataAllExTimes.allExTimes.length > 0 &&
      dataAllExTimes.allExTimes.length !== dataAllExcludedTimes.length
    ) {
      const updateDataTimes = dataAllExTimes.allExTimes.map((item) => {
        return {
          ...item,
          timeService: new Date(item.timeService),
        };
      });

      updateDataTimes.forEach((item) => {
        dispatch(addExcludTimes(item));
      });
    }
  }, [dataAllExTimes]);

  const deleteExpiredBookingTimes = async () => {
    await deleteExcludedTimesExpired();
  };

  const checkFirstActiveTime = (selectedDate) => {
    let incrementMin = 2400000;
    let startTime = new Date(selectedDate).setHours(8, 0, 0, 0);
    const endTime = new Date(selectedDate).setHours(19, 0, 0, 0);

    let timesArray = [];

    while (startTime < endTime) {
      timesArray = [...timesArray, new Date(startTime)];
      startTime = startTime + incrementMin;
    }

    const filterArray = timesArray.filter((item) => item > new Date());

    let restTimesArr = [];

    filterArray.forEach((item) => {
      restTimesArr = [...restTimesArr, item.getTime()];
    });

    let excludTimesArr = [];

    dataAllExcludedTimes.forEach((item) => {
      excludTimesArr = [...excludTimesArr, item.timeService.getTime()];
    });

    const availableFirstTime = restTimesArr.filter(
      (d) => !excludTimesArr.includes(d)
    );

    let hour;
    let minute;

    if (availableFirstTime.length > 0) {
      hour = new Date(availableFirstTime[0]).getHours();
      minute = new Date(availableFirstTime[0]).getMinutes();
    }

    return { hour, minute };
  };

  useEffect(() => {
    deleteExpiredBookingTimes();
  }, []);

  useEffect(() => {
    checkFirstActiveTime();
  }, [dataAllExcludedTimes]);

  return (
    <div className="booking__input-wrapper-day-time">
      <ErrorMessage component={errorMsg} name="date" />
      <div className="booking__inputs-wrapper">
        <div className="booking__input-wrapper-day">
          <label
            className={
              adminPanelClassLabel === "adminPanelClassLabel"
                ? "booking__label--admin"
                : "booking__label"
            }
            data-outside="bookingOutside"
          >
            Choose day of appointment
          </label>
          <Field name="date">
            {({ field, form }) => {
              const { setFieldValue } = form;
              const { value } = field;
              return (
                <DatePicker
                  customInput={
                    <input data-outside="bookingOutside" type="text" />
                  }
                  id="date"
                  {...field}
                  dateFormat="d.MM.yyyy"
                  filterDate={isWeekday}
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 3)}
                  minTime={
                    new Date(choosedDay).getDay() === 0
                      ? setHours(setMinutes(new Date(), 0), 0)
                      : setHours(setMinutes(new Date(), 0), 8)
                  }
                  maxTime={
                    new Date(choosedDay).getDay() === 0
                      ? setHours(setMinutes(new Date(), 0), 0)
                      : setHours(setMinutes(new Date(), 0), 19)
                  }
                  selected={value}
                  onChange={(val) => {
                    setFieldValue("date", val);
                    rangeTime.current = [];
                    setExcludeTimes(getExcludeTimesForDate(val));
                  }}
                  shouldCloseOnSelect={false}
                  showPopperArrow={false}
                  timeIntervals={40}
                  timeFormat="HH:mm"
                  filterTime={(time) => filterPassedTime(time)}
                  placeholderText="Select day"
                  autoComplete="off"
                  onSelect={(date) => {
                    const { hour, minute } = checkFirstActiveTime(date);

                    date.setHours(hour, minute, 0, 0);
                    setDisableBtn(date.getHours());
                    currentTimes.current = [];
                    setExcludeTimes(getExcludeTimesForDate(date));
                    setChoosedDay(date);
                    setIsDisableTime(false);
                  }}
                  excludeTimes={excludeTimes.map((item) => item.timeService)}
                  excludeDates={currentExcludedDays}
                ></DatePicker>
              );
            }}
          </Field>
        </div>
        <div className="booking__input-wrapper-time">
          <label
            className={
              adminPanelClassLabel === "adminPanelClassLabel"
                ? "booking__label--admin"
                : "booking__label booking__label--small-device"
            }
            data-outside="bookingOutside"
          >
            Choose time of appointment
          </label>
          <Field name="date">
            {({ field, form }) => {
              const { setFieldValue } = form;
              const { value } = field;
              return (
                <DatePicker
                  customInput={
                    <input data-outside="bookingOutside" type="text" />
                  }
                  id="date"
                  {...field}
                  dateFormat="h:mm aa"
                  //   filterDate={isWeekday}
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 3)}
                  minTime={
                    new Date(choosedDay).getDay() === 0
                      ? setHours(setMinutes(new Date(), 0), 0)
                      : setHours(setMinutes(new Date(), 0), 8)
                  }
                  maxTime={
                    new Date(choosedDay).getDay() === 0
                      ? setHours(setMinutes(new Date(), 0), 0)
                      : setHours(setMinutes(new Date(), 0), 19)
                  }
                  selected={value}
                  onChange={(val) => {
                    setDisableBtn(val.getHours());
                    setFieldValue("date", val);
                    rangeTime.current = [];
                    setExcludeTimes(getExcludeTimesForDate(val));
                  }}
                  shouldCloseOnSelect={false}
                  showTimeSelect
                  showPopperArrow={false}
                  timeCaption="Time"
                  timeIntervals={40}
                  timeFormat="HH:mm"
                  filterTime={(time) => filterPassedTime(time)}
                  placeholderText="Select time"
                  autoComplete="off"
                  onSelect={(date) => {
                    currentTimes.current = [];
                    setExcludeTimes(getExcludeTimesForDate(date));
                  }}
                  excludeTimes={excludeTimes.map((item) => item.timeService)}
                  excludeDates={currentExcludedDays}
                  timeClassName={(date) => {
                    return dataAllExcludedTimes.map((item) => {
                      if (
                        date.toLocaleString() ===
                          item.timeService?.toLocaleString() &&
                        !item.isCancel
                      ) {
                        return " disabled-date ";
                      } else {
                        return null;
                      }
                    });
                  }}
                  showTimeSelectOnly
                  disabled={isDisableTime}
                ></DatePicker>
              );
            }}
          </Field>
        </div>
      </div>
    </div>
  );
};

export default BookingFormDayTime;
