import React from "react";

import "./adminDashboardPanel.scss";

const adminDashboardPanel = () => {
  return (
    <main className="admin__dashboard-panel">
      <div className="admin__card-1 admin__card">Booked</div>
      <div className="admin__card-2 admin__card">Canceled</div>
      <div className="admin__card-3 admin__card">Customers</div>
      <div className="admin__card-4 admin__card">Emails</div>
      <div className="admin__card-5 admin__card">Income</div>
      <div className="admin__card-6 admin__card">Opinions</div>
      <div className="admin__card-7 admin__card">Visits</div>
      <div className="admin__card-8 admin__card">Time</div>
      <div className="admin__card-9 admin__card">Chart 1</div>
      <div className="admin__card-10 admin__card">Chart 2</div>
    </main>
  );
};

export default adminDashboardPanel;
