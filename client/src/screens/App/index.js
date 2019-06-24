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
      logout: false
    };
  }

  logout = async () => {
    await this.setState({ notify: false });
    this.setState({ logout: !this.state.logout });
  };

  notify = async () => {
    await this.setState({ logout: false });
    this.setState({ notify: !this.state.notify });
  };

  render() {
    return (
      <BrowserRouter>
        {/* <div className="dashboard-main-container">
                        <div className="dashboard-navbar">
                        <button className="notify-bell">
                            <img src="https://www.pngrepo.com/download/133673/notification-bell.png"/>
                        </button>
                            <div className="admin-navbar-name-container">
                            
                                <img className="admin-profile-img-navbar" src="data:image/jpeg;base64,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"/>
                                <span className="admin-name-navbar">Admin Name</span>
                            </div>
                        </div>
                        <div className="dashboard-sidebar">
                          
                        </div>
                        <Switch>
                            <Redirect exact from="/login" to="/dashboard" />
                            <Route path="/dashboard" component={Dashboard} />    
                            <Route path="/admin" component={Admin} />  
                            <Route path="/users" component={Users} />  
                            <Route path="/group" component={Group} />
                            <Route path="/settings" component={Settings} />    
                            <Route path="/changepassword" component={ChangePassword}/>
                        </Switch>    
                    </div> */}

        <div className="wrapper">
          <div className="menu-sidebar">
            {/* <div className="sidebar-content-container">
                                <ul className="sidebar-list">
                                    <li>
                                        <NavLink to="/dashboard" className="remove-hover">Dashboard</NavLink>
                                    </li>    
                                    <li>
                                        <NavLink to="/merchants" className="remove-hover">Merchants</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/users" className="remove-hover">Users</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/vouchers" className="remove-hover">Vouchers</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/transaction" className="remove-hover">Transaction</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/static" className="remove-hover">Static Pages</NavLink>
                                    </li>
                                </ul> 
                            </div> */}
            <Sidebar />
          </div>
          <div className="navbar">
            <div className="logo">
              {/* <h3>Logo</h3> */}
              <img src={require("../../assets/Image/mainLogo.png")} />
            </div>
            <div className="navbar-content">
              <div className="notify">
                <button className="notify-btn" onClick={() => this.notify()}>
                  <img src="https://www.pngrepo.com/download/133673/notification-bell.png" />
                </button>
              </div>
              <div className="navbar-admin-name">
                <button
                  className="admin-name-btn"
                  onClick={() => this.logout()}
                >
                  <img src="data:image/jpeg;base64,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" />
                  <span>Sarah O Connor</span>
                </button>
              </div>
            </div>

            {/* Navbar dropdown */}
            {this.state.notify ? (
              <div className="notify-dropdown">
                <div className="notify-title">
                  <p>You have 3 Notifications</p>
                </div>
                <div className="notify-item">
                  <div className="notify-item-icon">
                    <img src="https://png.pngtree.com/svg/20170713/b33443759c.svg" />
                  </div>
                  <div className="notify-item-content">
                    <p>You have a notification</p>
                    <span className="date">April 12 2019</span>
                  </div>
                </div>
                <div className="notify-item">
                  <div className="notify-item-icon">
                    <img src="https://png.pngtree.com/svg/20170713/b33443759c.svg" />
                  </div>
                  <div className="notify-item-content">
                    <p>You have a notification</p>
                    <span className="date">April 12 2019</span>
                  </div>
                </div>
              </div>
            ) : null}

            {this.state.logout ? (
              <div className="logout-dropdown">
                <div className="notify-item">
                  <button
                    className="logout-btn"
                    onClick={() => this.props.logoutNow()}
                  >
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

          <div className="main-content">
            <Switch>
              <Redirect exact from="/login" to="/dashboard" />
              <Route path="/dashboard" component={Dashboard} />
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
              <Route path="/settings" component={Settings} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { logoutNow }
)(index);
