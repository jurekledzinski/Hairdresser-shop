import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./reduxStore/store/store";

import "./App.scss";

import MainPage from "./components/mainpage/MainPage";
import BookingMainPage from "./components/others/booking/BookingMainPage";
import BookingDetails from "./components/others/booking/BookingDetails";
import BookingSuccess from "./components/others/booking/BookingSuccess";
import BookingCancel from "./components/others/booking/BookingCancel";
import BookingCancelByCode from "./components/others/booking/BookingCancelByCode";
import TeamDetails from "./components/content/team/TeamDetails";
import BookingTermPolicyDetails from "./components/others/booking/BookingTermPolicyDetails";
import AdminDashboard from "./components/others/admin/adminDashboard/AdminDashboard";
import Login from "./components/others/login/Login";
import Register from "./components/others/register/Register";

import ServerError from "./components/others/errorSuccessMessages/ServerErrors";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <Switch>
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
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/login-admin" component={Login} />
              <Route path="/register-admin" component={Register} />
            </ServerError>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
