import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./adminDashboardPanel.scss";

import { getVistisPageNumber } from "../../../../utils/sessions";

import AdminDashboardPanelChartOne from "./AdminDashboardPanelChartOne";
import AdminDashboardPanelChartTwo from "./AdminDashboardPanelChartTwo";

const adminDashboardPanel = () => {
  const dataBookedOrdersToUse = useSelector((store) => store.bookedOrdersData);
  const dataCanceledOrdersToUse = useSelector(
    (store) => store.canceledOrderData
  );
  const emailsData = useSelector((store) => store.emailDataToUse);
  const opinionsData = useSelector((store) => store.opinionsDataToUse);
  const [countVisits, setCountVisits] = useState(0);

  const currentDay = new Date().toLocaleDateString();

  const bookOrdersToday = dataBookedOrdersToUse.filter(
    (item) => new Date(item.dataPayed).toLocaleDateString() === currentDay
  );

  const canceledOrdersToday = dataCanceledOrdersToUse.filter(
    (item) => new Date(item.dataCancel).toLocaleDateString() === currentDay
  );

  const emailsToday = emailsData.filter(
    (item) => new Date(item.date).toLocaleDateString() === currentDay
  );

  const opinionsToday = opinionsData.filter(
    (item) => new Date(item.date).toLocaleDateString() === currentDay
  );

  let incomeTotalToday = bookOrdersToday.reduce(function (acc, curr) {
    return acc + curr.totalPrice;
  }, 0);

  const fetchCounterVisits = async () => {
    const { data, status } = await getVistisPageNumber();

    if (status === 200) {
      setCountVisits(data[0].counter);
    } else {
      setCountVisits(0);
    }
  };

  useEffect(() => {
    fetchCounterVisits();
  }, []);

  return (
    <main className="admin__dashboard-panel">
      <div className="admin__card-1 admin__card">
        <h4 className="admin__cart-title">Booked Today</h4>
        <h1 className="admin__cart-amount">{bookOrdersToday.length}</h1>
      </div>
      <div className="admin__card-2 admin__card">
        <h4 className="admin__cart-title">Canceled Today</h4>
        <h1 className="admin__cart-amount">{canceledOrdersToday.length}</h1>
      </div>
      <div className="admin__card-3 admin__card">
        <h4 className="admin__cart-title">Customers Today</h4>
        <h1 className="admin__cart-amount">{bookOrdersToday.length}</h1>
      </div>
      <div className="admin__card-4 admin__card">
        <h4 className="admin__cart-title">Emails Today</h4>
        <h1 className="admin__cart-amount">{emailsToday.length}</h1>
      </div>
      <div className="admin__card-5 admin__card">
        <h4 className="admin__cart-title">Income Today</h4>
        <h1 className="admin__cart-amount">{incomeTotalToday.toFixed(2)}€</h1>
      </div>
      <div className="admin__card-6 admin__card">
        <h4 className="admin__cart-title">Opinions Today</h4>
        <h1 className="admin__cart-amount">{opinionsToday.length}</h1>
      </div>
      <div className="admin__card-7 admin__card">
        <h4 className="admin__cart-title">Visits Today</h4>
        <h1 className="admin__cart-amount">{countVisits}</h1>
      </div>
      <div className="admin__card-8 admin__card">
        <h4 className="admin__cart-title">
          {new Date().toLocaleString("en-EN", { weekday: "long" })}
        </h4>
        <h1 className="admin__cart-amount">
          {new Date().toLocaleDateString()}
        </h1>
      </div>
      <div className="admin__card-9 admin__card">
        <AdminDashboardPanelChartOne />
      </div>
      <div className="admin__card-10 admin__card">
        <AdminDashboardPanelChartTwo />
      </div>
    </main>
  );
};

export default adminDashboardPanel;
