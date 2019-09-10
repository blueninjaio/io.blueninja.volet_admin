import React, { Component } from "react";
import { loginNow, getToken } from "../../../actions/actions";
import { connect } from "react-redux";
import { url } from "../../../config";

import { NavLink } from "react-router-dom";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      token: ""
    };
  }

  onActionValidateEmail = () => {};

  inputEmail(e) {
    this.setState({ email: e.target.value });
  }

  inputPassword(e) {
    this.setState({ password: e.target.value });
  }

  _storeData = async (token, email) => {
    this.setState({ token: token });
    try {
      await localStorage.setItem("user_token", token);

      if (token !== null) {
        fetch(`${url}/api/admin/me`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            email: email
          })
        })
          .then(res => res.json())

          .then(data => {
            if (data.success === true) {
              alert(data.message);
              this.props.loginNow();
            }
          })

          .catch(err => console.log(err));
      }
    } catch (error) {
      console.log(error, "this is an error");
    }
  };

  /**
    |--------------------------------------------------
    | calls login dispatcher 
    |--------------------------------------------------
    */
  login = async () => {
    let email = this.state.email;

    if (email.includes("@")) {
      fetch(`${url}/admin/login`, {
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
          if (data.success === true) {
            alert(data.message);
            console.log("Login Data: ", data.user);
            let token = data.token;
            let email = data.user.email;
            let id = data.user._id;
            console.log("token", token);
            localStorage.setItem("user_token", token);
            localStorage.setItem("user_email", email);
            localStorage.setItem("user_id", id);
            this._storeData(token, email);
            // localStorage.setItem("user_id", id);
            if (token !== null) {
              this.props.loginNow();
            }
          }
        })

        .catch(err => console.log(err));
    } else {
      alert("Please enter a valid email");
    }
  };

  render() {
    return (
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>

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
  { loginNow, getToken }
)(index);
