import React, { Component } from "react";
import { url } from "../../../config";
/**
|--------------------------------------------------
| renders static pages
|--------------------------------------------------
*/
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      email: "",
      old: "",
      new: "",
      confirm: ""
    };
  }

  /**
  |--------------------------------------------------
  | gets all data
  |--------------------------------------------------
  */
  componentDidMount() {
    this.onLoadGetID();
  }

  /**
  |--------------------------------------------------
  | sets state for the faq string
  |--------------------------------------------------
  */
  inputOldPassword(e) {
    this.setState({ old: e.target.value });
  }
  /**
  |--------------------------------------------------
  | sets state for the faq string
  |--------------------------------------------------
  */
  inputNewPassword(e) {
    this.setState({ new: e.target.value });
  }
  /**
  |--------------------------------------------------
  | sets state for the faq string
  |--------------------------------------------------
  */
  inputConfirmPassword(e) {
    this.setState({ confirm: e.target.value });
  }
  /**
  |--------------------------------------------------
  | sets state for the email string
  |--------------------------------------------------
  */
  inputEmail(e) {
    this.setState({ email: e.target.value });
  }

  onLoadGetID = () => {
    let id = localStorage.getItem("user_id");
    let email = localStorage.getItem("user_email");

    this.setState({ id, email });
  };
  /**
  |--------------------------------------------------
  | submits new change email to the api
  |--------------------------------------------------
  */
  onActionChangeEmail = () => {
    fetch(`${url}/api/admin/changeEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        _id: this.state.id,
        email: this.state.email
      })
    })
      .then(res => res.json())

      .then(data => {
        console.log(data);
        if (data.success === true) {
          alert(data.message);
          window.location.reload();
          console.log(data.success);
        }
      })

      .catch(err => console.log(err));
  };

  /**
  |--------------------------------------------------
  | submits new change password to the api
  |--------------------------------------------------
  */
  onActionChangePassword = () => {
    console.log(this.state.new);
    console.log(this.state.old);
    console.log(this.state.email);
    if (this.state.new === this.state.confirm) {
      fetch(`${url}/api/admin/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        body: JSON.stringify({
          old_password: this.state.old,
          new_password: this.state.new,
          email: this.state.email
        })
      })
        .then(res => res.json())

        .then(data => {
          if (data.success === true) {
            console.log(data);
            alert(data.message);
            window.location.reload();
            console.log(data.success);
          }
        })

        .catch(err => console.log(err));
    } else {
      alert("Please enter the valid password");
    }
  };

  render() {
    return (
      <div className="main-dashboard-container">
        <h3 className="page-title static-title">Settings</h3>
        <div className="accordion static-container" id="accordionExample">
          <div className="card" style={{ background: "white" }}>
            <div
              className="card-header"
              id="headingOne"
              style={{ background: "white" }}
            >
              <h5 className="mb-0">
                <button
                  disabled
                  className="btn btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Change Email
                </button>

                <button
                  className="btn btn-link collapse-view-btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne-1"
                >
                  View
                </button>
              </h5>
            </div>

            <div
              id="collapseOne"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="card-body" style={{ paddingLeft: "2.1rem" }}>
                Current Email: james@gmail.com
                <button
                  className="btn btn-link collapse-view-btn move-btn settings-email-btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne-1"
                  aria-expanded="true"
                  aria-controls="collapseOne-1"
                >
                  Edit
                </button>
              </div>
            </div>
            <div
              id="collapseOne-1"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                <textarea
                  value={this.state.email}
                  onChange={this.inputEmail.bind(this)}
                  className="form-control static-input"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  style={{ resize: "none" }}
                  placeholder="Enter new email address"
                />
                <button onClick={() => this.onActionChangeEmail()}>
                  Enter New Email Address
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <div
              className="card-header"
              id="headingTwo"
              style={{ background: "white" }}
            >
              <h5 className="mb-0">
                <button
                  disabled
                  className="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Change Password
                </button>
                <button
                  className="btn btn-link collapse-view-btn move-btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo-1"
                  aria-expanded="true"
                  aria-controls="collapseOne-1"
                >
                  Change Password
                </button>
              </h5>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              <div className="card-body" style={{ paddingLeft: "2.1rem" }}>
                <span>Current password: 1234567</span>
              </div>
            </div>

            <div
              id="collapseTwo-1"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                <input
                  type="email"
                  value={this.state.old}
                  onChange={this.inputOldPassword.bind(this)}
                  className="form-control static-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter old password"
                />
                <input
                  type="email"
                  value={this.state.new}
                  onChange={this.inputNewPassword.bind(this)}
                  className="form-control static-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter new password"
                />
                <input
                  type="email"
                  value={this.state.confirm}
                  onChange={this.inputConfirmPassword.bind(this)}
                  className="form-control static-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter confirm new password"
                />
                <button onClick={() => this.onActionChangePassword()}>
                  Confirm New Password
                </button>
              </div>
            </div>
          </div>

          <div className="card" style={{ background: "white" }}>
            <div
              className="card-header"
              id="headingOne"
              style={{ background: "white" }}
            >
              <h5 className="mb-0">
                <button
                  disabled
                  className="btn btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Forgot Password
                </button>
                {/* <button
                  className="btn btn-link collapse-view-btn move-btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#faq-edit"
                  aria-expanded="true"
                  aria-controls="collapseOne-1"
                >
                  Edit
                </button> */}
                <button
                  className="btn btn-link collapse-view-btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#faq-view"
                  aria-expanded="true"
                  aria-controls="collapseOne-1"
                >
                  Send Email
                </button>
              </h5>
            </div>

            <div
              id="faq-view"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div
                className="card-body"
                style={{ paddingLeft: "2.1rem", display: "inline-grid" }}
              >
                <span>Your Email is: currentemail@gmail.com</span>
                <button
                  onClick={() => this.submitPolicy()}
                  style={{ marginTop: "1rem" }}
                >
                  Send me the email
                </button>
              </div>
            </div>
            <div
              id="faq-edit"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                <textarea
                  value={this.state.faq}
                  // onChange={this.inputFAQ.bind(this)}
                  className="form-control static-input"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  style={{ resize: "none" }}
                  placeholder="Enter email to resend"
                />

                <button onClick={() => this.submitFAQ()}>
                  Enter your email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
