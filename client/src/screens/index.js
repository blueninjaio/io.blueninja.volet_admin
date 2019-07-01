import React, { Component } from "react";
import Login from "./Login/index";
import { loginNow } from "../actions/actions";
import App from "./App/index";
import { connect } from "react-redux";
import { url } from "../config";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ""
    };
  }

  async componentDidMount() {
    //Check if there is a token
    //If there is a token then verify that it is valid
    //If token is valid then login directly
    //If not valid token then remove token from local storage
    let receivedToken = localStorage.getItem("user_token");
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
  }

  render() {
    return <div>{this.props.login === true ? <App /> : <Login />}</div>;
  }
}

/**
|--------------------------------------------------
| calls the login state from the login reducer
|--------------------------------------------------
*/
const mapStateToProps = state => {
  return {
    login: state.login.isLoggedIn
  };
};

/**
|--------------------------------------------------
| connects the state and dispatch to the screen index
|--------------------------------------------------
*/

export default connect(
  mapStateToProps,
  loginNow
)(index);
