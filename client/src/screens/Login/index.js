import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

/**
|--------------------------------------------------
| renders Login page and initialises all the routes
|--------------------------------------------------
*/
export default class index extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="login-main-container">
          <div className="login-side-img-container">
            <img
              alt="landing-page-img"
              src="https://images.pexels.com/photos/1227520/pexels-photo-1227520.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="page-change-container">
            <Switch>
              <Redirect exact from="/" to="/login" />
              <Redirect exact from="/dashboard" to="/login" />
              <Redirect exact from="/merchants" to="/login" />
              <Redirect exact from="/users" to="/login" />
              <Redirect exact from="/useragent" to="/login" />
              <Redirect exact from="/vouchers" to="/login" />
              <Redirect exact from="/static" to="/login" />
              <Redirect exact from="/viewvoucher" to="/login" />
              <Redirect exact from="/viewuser" to="/login" />
              <Redirect exact from="/viewagent" to="/login" />
              <Redirect exact from="/viewmerchant" to="/login" />
              <Redirect exact from="/transaction" to="/login" />
              <Redirect exact from="/business" to="/login" />
              <Redirect exact from="/businessrequest" to="/login" />
              <Redirect exact from="/pushnotification" to="/login" />
              <Redirect exact from="/feedback" to="/login" />
              <Redirect exact from="/transaction" to="/login" />
              <Redirect exact from="/businessTypes" to="/login" />
              <Redirect exact from="/agentrequests" to="/login" />
              <Redirect exact from="/businesscategory" to="/login" />
              <Redirect exact from="/settings" to="/login" />
              <Redirect exact from="/banks" to="/login" />
              <Redirect exact from="/paymentmethods" to="/login" />
              <Redirect exact from="/currency" to="/login" />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/forgotpassword" component={ForgotPassword} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
