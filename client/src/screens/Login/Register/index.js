import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class index extends Component {
  /**
    |--------------------------------------------------
    | navigates user to login page
    |--------------------------------------------------
    */
  register = () => {
    this.props.history.push("/login");
  };

  /**
    |--------------------------------------------------
    | navigates user to login page
    |--------------------------------------------------
    */
  back = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="login-form-container">
        <h2 className="login-title">Register</h2>

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
        <input
          type="name"
          className="form-control login-input"
          placeholder="Enter name"
        />
        <input
          type="username"
          className="form-control login-input"
          placeholder="Enter username"
        />
        <input
          type="text"
          className="form-control login-input"
          placeholder="Enter D.O.B"
        />

        <button className="login-btn" onClick={() => this.register()}>
          Register
        </button>
        <button className="login-btn" onClick={() => this.back()}>
          Back
        </button>

        <small
          id="emailHelp"
          className="form-text forgot-password-text go-register-text"
        >
          Don't have an account? <NavLink to="/register">Sign in</NavLink>
        </small>
      </div>
    );
  }
}
