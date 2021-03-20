import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";

import MainPage from "./components/mainpage/MainPage";
import BookingMainPage from "./components/others/booking/BookingMainPage";
import TeamDetails from "./components/content/team/TeamDetails";
import BookingTermPolicyDetails from "./components/others/booking/BookingTermPolicyDetails";
import AdminDashboard from "./components/others/admin/AdminDashboard";
import Login from "./components/others/login/Login";
import Register from "./components/others/register/Register";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/booking" component={BookingMainPage} />
          <Route path="/team-details" component={TeamDetails} />
          <Route path="/term-policy" component={BookingTermPolicyDetails} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/login-admin" component={Login} />
          <Route path="/register-admin" component={Register} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
