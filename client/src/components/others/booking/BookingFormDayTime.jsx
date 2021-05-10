import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, ErrorMessage } from "formik";
import addMonths from "date-fns/addMonths";
import getDay from "date-fns/getDay";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import subDays from "date-fns/subDays";
import isSameDay from "date-fns/isSameDay";
import addDays from "date-fns/addDays";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from "uuid";

import "./BookingFormDayTime.scss";

import { deleteExcludedTimesExpired } from "../.././../utils/sessions";

import { addExcludTimes } from "../../../reduxStore/actions/actionExcludedTimes";
import { fetchAllTimesExcluded } from "../../../reduxStore/actions/actionFetchExcludedTimes";

import "react-datepicker/dist/react-datepicker.css";

const BookingFormDayTime = ({ choosedTime, errorMsg, setDisableBtn }) => {
  const dispatch = useDispatch();
  const dataAllExcludedTimes = useSelector((store) => store.excludedTimesData);
  const dataAllExTimes = useSelector((store) => store.allFetchExTimesData);

  //   console.log(dataAllExcludedTimes, " dataAllExcludedTimes dni i czas");

  //   console.log(dataAllExTimes, " dataAllExTimes kalendarz pobrane z bazy");

  const rangeTime = useRef([]);
  const currentTimes = useRef([]);

  const [allExcludeDays, setAllExcludeDays] = useState([]);
  const [currentExcludedDays, setCurrentExcludedDays] = useState([]);
  const [choosedDay, setChoosedDay] = useState();

  //   console.log(choosedDay, " choosedDay");

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

  //   console.log(excludeTimes, " excludeTimes ");

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

    // console.log(excludeDate, " excludeDate");

    let getKeys = Object.keys(excludeDate);

    let arrayExcludedDates = getKeys.filter((item) => {
      if (excludeDate[item].length === 17) {
        // console.log("pierwsze");
        return excludeDate[item];
      } else if (currentTimes.current.length === 1) {
        // console.log("drugie");
        currentTimes.current = [];
        return excludeDate[item];
      }

      return null;
    });

    // console.log(arrayExcludedDates, "arrayExcludedDates");
    // console.log(allExcludeDays, "allExcludeDays");

    // console.log(currentTimes.current, " currentTimes.current");

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

  useEffect(() => {
    deleteExpiredBookingTimes();
  }, []);

  return (
    <div className="booking__input-wrapper-day-time">
      <ErrorMessage component={errorMsg} name="date" />
      <div className="booking__inputs-wrapper">
        <div className="booking__input-wrapper-day">
          <label className="booking__label">Choose day of appointment</label>
          <Field name="date">
            {({ field, form }) => {
              const { setFieldValue } = form;
              const { value } = field;
              return (
                <DatePicker
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
                  timeCaption="time"
                  timeIntervals={40}
                  timeFormat="HH:mm"
                  filterTime={(time) => filterPassedTime(time)}
                  placeholderText="Select day"
                  autoComplete="off"
                  onSelect={(date) => {
                    setDisableBtn(date.getHours());
                    currentTimes.current = [];
                    setExcludeTimes(getExcludeTimesForDate(date));
                    setChoosedDay(date);
                  }}
                  excludeTimes={excludeTimes.map((item) => item.timeService)}
                  excludeDates={currentExcludedDays}
                ></DatePicker>
              );
            }}
          </Field>
        </div>
        <div className="booking__input-wrapper-time">
          <label className="booking__label">Choose time of appointment</label>
          <Field name="date">
            {({ field, form }) => {
              const { setFieldValue } = form;
              const { value } = field;
              return (
                <DatePicker
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
                  timeCaption="time"
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
                ></DatePicker>
              );
            }}
          </Field>
        </div>
      </div>
    </div>
  );
};

// className="booking__input-select-time" select

export default BookingFormDayTime;
