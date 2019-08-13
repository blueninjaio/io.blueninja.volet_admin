import React, { Component } from "react";
import Login from "./Login/index";
import { loginNow, logoutNow } from "../actions/actions";
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
    let receivedToken = localStorage.getItem("user_token");
    let userEmail = localStorage.getItem("user_email");
    this.setState({ token: receivedToken });

    try {
      if (receivedToken !== null && userEmail) {
        fetch(`${url}/api/admin/me`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${receivedToken}`,
            Authorization: `Bearer ${receivedToken}`
          },
          body: JSON.stringify({
            email: userEmail
          })
        })
          .then(res => res.json())

          .then(data => {
            if (data.success === true) {
              // alert(data.message);
              this.props.loginNow();
            }
          })

          .catch(err => console.log(err));
      } else if (receivedToken === null) {
        return <Login />;
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
  { loginNow, logoutNow }
)(index);
