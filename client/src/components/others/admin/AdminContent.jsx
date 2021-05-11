import React from "react";
import { Route, Switch } from "react-router-dom";

import "./AdminContent.scss";

import AdminDashboardPanel from "./adminSubpages/AdminDashboardPanel";
import AdminBooked from "./adminSubpages/AdminBooked";
import AdminBookedDetails from "./adminSubpages/AdminBookedDetails";
import AdminCanceled from "./adminSubpages/AdminCanceled";
import AdminCanceledDetails from "./adminSubpages/AdminCanceledDetails";
import AdminEmails from "./adminSubpages/AdminEmails";
import AdminGallery from "./adminSubpages/AdminGallery";
import AdminAppointments from "./adminSubpages/AdminAppointments";
import AdminShop from "./adminSubpages/AdminShop";
import AdminOpinions from "./adminSubpages/AdminOpinions";
import AdminProfile from "./adminSubpages/AdminProfile";
import AdminService from "./adminSubpages/AdminService";

const AdminContent = ({ isLogOutMsg }) => {
  return (
    <div className="admin-content">
      {isLogOutMsg && <p className="admin__logout">{isLogOutMsg}</p>}
      <Switch>
        <Route exact path="/admin" component={AdminDashboardPanel} />
        <Route path="/admin/booked" component={AdminBooked} />
        <Route path="/admin/details-booked-order/:id" component={AdminBookedDetails} />
        <Route path="/admin/canceled" component={AdminCanceled} />
        <Route
          path="/admin/details-canceled-order/:id"
          component={AdminCanceledDetails}
        />
        <Route path="/admin/emails" component={AdminEmails} />
        <Route path="/admin/gallery" component={AdminGallery} />
        <Route path="/admin/apponitments" component={AdminAppointments} />
        <Route path="/admin/shop" component={AdminShop} />
        <Route path="/admin/opinions" component={AdminOpinions} />
        <Route path="/admin/profile" component={AdminProfile} />
        <Route path="/admin/service" component={AdminService} />
      </Switch>
    </div>
  );
};
export default AdminContent;
