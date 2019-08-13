import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { url } from "../../../config";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  inputEmail(e) {
    this.setState({ email: e.target.value });
    console.log("Email:", this.state.email);
  }

  inputPassword(e) {
    this.setState({ password: e.target.value });
    console.log("Password:", this.state.password);
  }

  /**
    |--------------------------------------------------
    | navigates user to login page
    |--------------------------------------------------
    */
  register = () => {
    fetch(`${url}/api/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Data", data);
        console.log("Data", data.success);
        if (data.success) {
          console.log("Registration status: ", data.success);
          this.props.history.push("/login");
        }
        alert(data.message);
      })

      .catch(err => console.log(err));
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
          value={this.state.email}
          onChange={this.inputEmail.bind(this)}
          type="email"
          className="form-control login-input"
          placeholder="Enter email"
        />
        <input
          value={this.state.password}
          onChange={this.inputPassword.bind(this)}
          type="password"
          className="form-control login-input"
          placeholder="Enter password"
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
