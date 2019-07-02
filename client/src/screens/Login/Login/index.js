import React, { Component } from "react";
import { loginNow, getToken } from "../../../actions/actions";
import { connect } from "react-redux";
import { url } from "../../../config";

import { NavLink } from "react-router-dom";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "admin@admin.com",
      password: "admin12345",
      token: ""
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

  _storeData = async receivedToken => {
    this.setState({ token: receivedToken });
    try {
      await localStorage.setItem("user_token", receivedToken);

      if (receivedToken !== null) {
        fetch(`${url}/api/admin/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${receivedToken}`,
            Authorization: `Bearer ${receivedToken}`
          }
        })
          .then(res => res.json())

          .then(data => {
            if (data.success === true) {
              console.log("Verification data: ", data.user);
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
    //this.props.getToken(this.state.email, this.state.password);

    //Fetch to login
    //Return of fetch if successful will give token
    //save token then this.props.logMeIn()
    // return data.message
    if (this.state.token !== null) {
      this._storeData(this.state.token);
    }

    fetch(`${url}/api/admin/login`, {
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
          let token = data.token;
          localStorage.setItem("user_token", token);

          if (token !== null) {
            this.props.loginNow();
          }
        }
      })

      .catch(err => console.log(err));
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
