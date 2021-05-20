import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";

import { Role } from "../../../helpers/roles";

import "./AdminContent.scss";

const AdminDashboardPanel = lazy(() =>
  import("./adminSubpages/AdminDashboardPanel")
);
const AdminBooked = lazy(() => import("./adminSubpages/AdminBooked"));
const AdminBookedDetails = lazy(() =>
  import("./adminSubpages/AdminBookedDetails")
);
const AdminCanceled = lazy(() => import("./adminSubpages/AdminCanceled"));
const AdminCanceledDetails = lazy(() =>
  import("./adminSubpages/AdminCanceledDetails")
);
const AdminEmails = lazy(() => import("./adminSubpages/AdminEmails"));
const AdminGallery = lazy(() => import("./adminSubpages/AdminGallery"));
const AdminAppointments = lazy(() =>
  import("./adminSubpages/AdminAppointments")
);
const AdminAppointmentDetails = lazy(() =>
  import("./adminSubpages/AdminAppointmentDetails")
);
const AdminShop = lazy(() => import("./adminSubpages/AdminShop"));
const AdminOpinions = lazy(() => import("./adminSubpages/AdminOpinions"));
const AdminProfile = lazy(() => import("./adminSubpages/AdminProfile"));
const AdminService = lazy(() => import("./adminSubpages/AdminService"));

import { ProtectAdmin } from "../../../protectRoutes/ProtectAdminRoutes";

import DotLoader from "../dotLoader/DotLoader";

const AdminContent = ({ isLogOutMsg }) => {
  return (
    <div className="admin-content">
      <Suspense fallback={<DotLoader />}>
        {isLogOutMsg && <p className="admin-content__logout">{isLogOutMsg}</p>}
        <Switch>
          <ProtectAdmin
            exact
            path="/admin"
            component={AdminDashboardPanel}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/booked"
            component={AdminBooked}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/details-booked-order/:id"
            component={AdminBookedDetails}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/canceled"
            component={AdminCanceled}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/details-canceled-order/:id"
            component={AdminCanceledDetails}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/emails"
            component={AdminEmails}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/gallery"
            component={AdminGallery}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/apponitments"
            component={AdminAppointments}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/details-appointment/:id"
            component={AdminAppointmentDetails}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/shop"
            component={AdminShop}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/opinions"
            component={AdminOpinions}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/profile"
            component={AdminProfile}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
          <ProtectAdmin
            path="/admin/service"
            component={AdminService}
            roles={[Role.Admin, Role.SuperAdmin]}
          />
        </Switch>
      </Suspense>
    </div>
  );
};
export default AdminContent;
