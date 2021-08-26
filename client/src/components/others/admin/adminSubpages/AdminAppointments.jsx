import React, { useEffect } from "react";

import "./AdminAppointments.scss";

import BookingForm from "../../booking/BookingForm";
import BookingCancelForm from "../../booking/BookingCancelForm";

const AdminAppointments = () => {
  useEffect(() => {
    const item = sessionStorage.getItem("pageTwo");
    if (item) {
      sessionStorage.removeItem("pageTwo");
    }
  }, []);

  return (
    <article className="admin-appointments">
      <BookingForm
        adminPanelClassLabel="adminPanelClassLabel"
        adminPanelClassInput="adminPanelClassInput"
        adminPanelClassButton="adminPanelClassButton"
        adminPanelClassWhere="adminPanelClassWhere"
        adminPanelClassRedirect="adminPanelClassRedirect"
      />
      <BookingCancelForm
        adminPanelClassLabel="adminPanelClassLabel"
        adminPanelClassInput="adminPanelClassInput"
        adminPanelRedirect="adminPanelRedirect"
      />
    </article>
  );
};

export default AdminAppointments;
