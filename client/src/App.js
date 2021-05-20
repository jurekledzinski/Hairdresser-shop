import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Route, useHistory, useRouteMatch } from "react-router-dom";

import store from "./reduxStore/store/store";
import { Role } from "./helpers/roles";

import "./App.scss";

const MainPage = lazy(() => import("./components/mainpage/MainPage"));
const BookingMainPage = lazy(() =>
  import("./components/others/booking/BookingMainPage")
);
const BookingDetails = lazy(() =>
  import("./components/others/booking/BookingDetails")
);
const BookingSuccess = lazy(() =>
  import("./components/others/booking/BookingSuccess")
);
const BookingCancel = lazy(() =>
  import("./components/others/booking/BookingCancel")
);
const BookingCancelByCode = lazy(() =>
  import("./components/others/booking/BookingCancelByCode")
);
const TeamDetails = lazy(() => import("./components/content/team/TeamDetails"));
const BookingTermPolicyDetails = lazy(() =>
  import("./components/others/booking/BookingTermPolicyDetails")
);
const AdminDashboard = lazy(() =>
  import("./components/others/admin/adminDashboard/AdminDashboard")
);
const Login = lazy(() => import("./components/others/login/Login"));
const Register = lazy(() => import("./components/others/register/Register"));

import ServerError from "./components/others/errorSuccessMessages/ServerErrors";

import { ProtectAdmin } from "./protectRoutes/ProtectAdminRoutes";
import { ProtectRegister } from "./protectRoutes/ProtectRegisterRoute";

import DotLoader from "./components/others/dotLoader/DotLoader";

const App = () => {
  const history = useHistory();
  const url = history.location.pathname;
  const isBookingUrl = url.indexOf("booking");
  const isDetailsUrl = url.indexOf("details");
  const isSuccessUrl = url.indexOf("success");
  const isCancelUrl = url.indexOf("cancel");
  const isCancelCodeUrl = url.indexOf("cancel-code");

  const checkClass =
    (isBookingUrl !== -1 && isDetailsUrl !== -1) || isBookingUrl !== -1
      ? isSuccessUrl !== -1 || isCancelUrl !== -1 || isCancelCodeUrl !== -1
        ? "app"
        : "app app--booking-endpoint"
      : "app";

  return (
    <Provider store={store}>
      <div className={checkClass}>
        <Suspense fallback={<DotLoader />}>
          <ServerError>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/booking" component={BookingMainPage} />
            <Route path="/booking/details/:id" component={BookingDetails} />
            <Route path="/booking/success/:id" component={BookingSuccess} />
            <Route path="/booking/cancel/:id" component={BookingCancel} />
            <Route
              path="/booking/cancel-code/:id"
              component={BookingCancelByCode}
            />
            <Route path="/team-details" component={TeamDetails} />
            <Route path="/term-policy" component={BookingTermPolicyDetails} />
            <ProtectAdmin
              path="/admin"
              roles={[Role.Admin, Role.SuperAdmin]}
              component={AdminDashboard}
            />
            <Route path="/login-admin" component={Login} />
            <ProtectRegister path="/register-admin" component={Register} />
          </ServerError>
        </Suspense>
      </div>
    </Provider>
  );
};

export default App;
