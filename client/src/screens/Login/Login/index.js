import React, { Component } from "react";
import { loginNow } from "../../../actions/actions";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";

class index extends Component {
  /**
    |--------------------------------------------------
    | calls login dispatcher 
    |--------------------------------------------------
    */
  login = () => {
    this.props.loginNow();
  };

  render() {
    return (
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>

        <input
          type="email"
          className="form-control login-input"
          placeholder="Enter email"
        />
        <input
          type="password"
          className="form-control login-input"
          placeholder="Enter password"
        />

        <NavLink to="/forgotpassword">
          <small id="emailHelp" className="form-text forgot-password-text">
            Forgot Password?
          </small>
        </NavLink>
        <button className="login-btn" onClick={() => this.login()}>
          Login
        </button>

        <small
          id="emailHelp"
          className="form-text forgot-password-text go-register-text"
        >
          Don't have an account? <NavLink to="/register">Sign up</NavLink>
        </small>
      </div>
    );
  }
}

/**
|--------------------------------------------------
| connects dispatcher to the page
|--------------------------------------------------
*/
export default connect(
  null,
  { loginNow }
)(index);
