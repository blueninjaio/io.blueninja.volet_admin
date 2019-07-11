import React, { Component } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrowIndicator: false
    };
  }

  onActionScrollSidebar = () => {
    this.setState({ arrowIndicator: true });
    if (this.refs.sidebar.scrollTop === 0) {
      this.setState({ arrowIndicator: false });
    }
  };

  render() {
    return (
      <div className="sidebar-content-container">
        <ul
          className="sidebar-list"
          ref="sidebar"
          onScroll={() => this.onActionScrollSidebar()}
        >
          <li>
            <NavLink to="/dashboard" className="remove-hover">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className="remove-hover">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/merchants" className="remove-hover">
              Merchants
            </NavLink>
          </li>
          <li>
            <NavLink to="/business" className="remove-hover">
              Businesses
            </NavLink>
          </li>
          <li>
            <NavLink to="/transaction" className="remove-hover">
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink to="/agentrequests" className="remove-hover">
              Agent Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/businessrequest" className="remove-hover">
              Business Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback" className="remove-hover">
              Feedback
            </NavLink>
          </li>
          <li>
            <NavLink to="/pushnotification" className="remove-hover">
              Push Notification
            </NavLink>
          </li>
          <li>
            <NavLink to="/businessTypes" className="remove-hover">
              Business Types
            </NavLink>
          </li>
          <li>
            <NavLink to="/vouchers" className="remove-hover">
              Vouchers
            </NavLink>
          </li>
          <li>
            <NavLink to="/static" className="remove-hover">
              Static Pages
            </NavLink>
          </li>
        </ul>
        {this.state.arrowIndicator === false ? (
          <img
            className="sidebar-arrow-img"
            src="https://i0.wp.com/meritocracy.is/blog/wp-content/uploads/2019/01/grey-down-arrow-icon-png-1.png?fit=385%2C233&ssl=1"
          />
        ) : null}
      </div>
    );
  }
}
