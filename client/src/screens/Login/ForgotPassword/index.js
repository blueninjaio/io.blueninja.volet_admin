import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {url} from "../../../config";

/**
|--------------------------------------------------
| renders forgot password page
|--------------------------------------------------
*/
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
    }

    inputEmail(e) {
        this.setState({ email: e.target.value });
        console.log("Email:", this.state.email);
    }

    resetPassword = () => {
        fetch(`${url}/api/admin/forgotPassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Accept: "application/json"
            },
            body: JSON.stringify({
                email: this.state.email
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.props.history.push("/login");
                }
                alert(data.message);
            })
            .catch(err => console.log(err));
    };
  render() {
    return (
      <div className="login-form-container">
        <h2 className="login-title">Forgot Password</h2>

        <input
          type="email"
          className="form-control login-input"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.inputEmail.bind(this)}
        />

        <button
            className="login-btn"
            onClick={this.resetPassword}
        >Send me the email</button>
        <button
          className="login-btn"
          onClick={() => this.props.history.push("/login")}
        >
          Back
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
