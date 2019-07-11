import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Merchants from "./Merchants";
import UserAgent from "./UserAgent";
import Users from "./Users";
import Voucher from "./Voucher";
import ViewVoucher from "./ViewVoucher";
import ViewUser from "./ViewUser";
import ViewAgent from "./ViewAgent";
import ViewMerchant from "./ViewMerchant";
import Static from "./Static";
import Settings from "./Settings";
import Transaction from "./Transaction";
import Business from "./Business";
import BusinessRequest from "./BusinessRequest";
import SendNotifcation from "./SendNotification";
import PushNotification from "./PushNotification";
import Feedback from "./Feedback";
import BusinessTypes from "./BusinessTypes";
import AgentRequests from "./AgentRequests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { logoutNow } from "../../actions/actions";
import Sidebar from "../../components/Sidebar";

import { connect } from "react-redux";

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  NavLink
} from "react-router-dom";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notify: false,
      logoutPop: false,
      email: ""
    };
  }

  componentDidMount() {
    let userEmail = localStorage.getItem("user_email");
    this.setState({ email: userEmail });
  }

  logout = async () => {
    await localStorage.removeItem("user_token");
    await this.props.logoutNow();
  };

  /**
  |--------------------------------------------------
  | Logout user and sets logout state to true
  |--------------------------------------------------
  */
  logoutPop = async () => {
    // await localStorage.removeItem("user_token");
    await this.setState({ notify: false });
    this.setState({ logout: !this.state.logout });
  };

  /**
  |--------------------------------------------------
  | open notification div
  |--------------------------------------------------
  */
  notify = async () => {
    await this.setState({ logout: false });
    this.setState({ notify: !this.state.notify });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <div className="menu-sidebar hide-small-mobile">
            <Sidebar />
          </div>
          <div className="navbar">
            <div className="logo">
              <img
                src={require("../../assets/Image/mainLogo.png")}
                alt="volet-logo"
              />
            </div>
            <button
              className="power-btn-navbar"
              onClick={() => this.logoutPop()}
            >
              {/* <img
                src="https://images.vexels.com/media/users/3/131799/isolated/preview/58f48ca730925348c9fb03c19b862bc7-power-button-icon-by-vexels.png"
                style={{ width: "100%", height: "100%" }}
              /> */}

              <FontAwesomeIcon icon={faPowerOff} style={{ color: "white" }} />
            </button>
            <div className="navbar-content hide-small-mobile">
              {/* <div className="notify">
                <button className="notify-btn" onClick={() => this.notify()}>
                  <img
                    src="https://www.pngrepo.com/download/133673/notification-bell.png"
                    alt="notification-icon"
                  />
                </button>
              </div> */}

              <div className="navbar-admin-name">
                <button
                  className="admin-name-btn"
                  // onClick={() => this.logoutPop()}
                >
                  <span>{this.state.email}</span>
                </button>
              </div>
            </div>

            {/* Navbar dropdown */}
            {/* {this.state.notify ? (
              <div className="notify-dropdown">
                <div className="notify-title">
                  <p>You have 3 Notifications</p>
                </div>
                <div className="notify-item">
                  <div className="notify-item-icon">
                    <img
                      alt="mail-icon-1"
                      src="https://png.pngtree.com/svg/20170713/b33443759c.svg"
                    />
                  </div>
                  <div className="notify-item-content">
                    <p>You have a notification</p>
                    <span className="date">April 12 2019</span>
                  </div>
                </div>
                <div className="notify-item">
                  <div className="notify-item-icon">
                    <img
                      alt="mail-icon-2"
                      src="https://png.pngtree.com/svg/20170713/b33443759c.svg"
                    />
                  </div>
                  <div className="notify-item-content">
                    <p>You have a notification</p>
                    <span className="date">April 12 2019</span>
                  </div>
                </div>
              </div>
            ) : null} */}

            {this.state.logout ? (
              <div
                className="logout-dropdown"
                onMouseLeave={() => this.setState({ logout: false })}
              >
                <div className="notify-item">
                  <button className="logout-btn" onClick={() => this.logout()}>
                    Logout
                  </button>
                </div>
                <div className="notify-item">
                  <NavLink className="logout-btn settings-btn" to="/settings">
                    Settings
                  </NavLink>
                </div>
              </div>
            ) : null}
          </div>

          <div className="main-content hide-small-mobile">
            <Switch>
              <Redirect exact from="/login" to="/dashboard" />
              <Route
                path="/dashboard"
                component={() => <Dashboard drop={this.state.logoutPop} />}
              />
              <Route path="/users" component={Users} />
              <Route path="/merchants" component={Merchants} />
              <Route path="/useragent" component={UserAgent} />
              <Route path="/vouchers" component={Voucher} />
              <Route path="/transaction" component={Transaction} />
              <Route path="/viewvoucher" component={ViewVoucher} />
              <Route path="/viewuser" component={ViewUser} />
              <Route path="/viewagent" component={ViewAgent} />
              <Route path="/viewmerchant" component={ViewMerchant} />
              <Route path="/static" component={Static} />
              <Route path="/business" component={Business} />
              <Route path="/businessrequest" component={BusinessRequest} />
              <Route path="/settings" component={Settings} />
              <Route path="/pushnotification" component={PushNotification} />
              <Route path="/sendnotification" component={SendNotifcation} />
              <Route path="/feedback" component={Feedback} />
              <Route path="/businessTypes" component={BusinessTypes} />
              <Route path="/agentrequests" component={AgentRequests} />
            </Switch>
          </div>
        </div>

        <div className="show-only-mobile d-block d-sm-none d-none d-sm-block d-md-none">
          <p>Please use a Tablet/Desktop</p>
          <p>to access the Admin Panel</p>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { logoutNow }
)(index);
