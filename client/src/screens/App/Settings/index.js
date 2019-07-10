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
      faq: "",
      policy: "",
      receivedFAQ: "",
      receivedPolicy: ""
    };
  }

  /**
  |--------------------------------------------------
  | gets all data
  |--------------------------------------------------
  */
  componentDidMount() {
    this.getStatic();
  }

  /**
  |--------------------------------------------------
  | sets state for the faq string
  |--------------------------------------------------
  */
  inputFAQ(e) {
    this.setState({ faq: e.target.value });
  }
  /**
  |--------------------------------------------------
  | sets state for the policy string
  |--------------------------------------------------
  */
  inputPolicy(e) {
    this.setState({ policy: e.target.value });
  }
  /**
  |--------------------------------------------------
  | gets data from api
  |--------------------------------------------------
  */
  getStatic = () => {
    fetch(`${url}/api/static`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      }
    })
      .then(res => res.json())

      .then(data => {
        if (data.static.length >= 1) {
          this.setState({ receivedFAQ: data.static[0].faq });
          this.setState({ receivedPolicy: data.static[0].policies });
        }
      })

      .catch(err => console.log(err));
  };

  /**
  |--------------------------------------------------
  | submits policy state/string to the api
  |--------------------------------------------------
  */
  submitPolicy = () => {
    fetch(`${url}/api/static/policies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        policy: this.state.policy
      })
    })
      .then(res => res.json())

      .then(data => {
        console.log(data);
        if (data.success === true) {
          alert(data.message);
          console.log(data.success);
        }
      })

      .catch(err => console.log(err));
  };
  /**
  |--------------------------------------------------
  | submits faq state/string to the api
  |--------------------------------------------------
  */
  submitFAQ = () => {
    fetch(`${url}/api/static/faq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        faq: this.state.faq
      })
    })
      .then(res => res.json())

      .then(data => {
        console.log(data);
        if (data.success === true) {
          alert(data.message);
          console.log(data.success);
        }
      })

      .catch(err => console.log(err));
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
                  className="btn btn-link collapse-view-btn move-btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne-1"
                  aria-expanded="true"
                  aria-controls="collapseOne-1"
                >
                  Edit
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
                  value={this.state.policy}
                  onChange={this.inputPolicy.bind(this)}
                  className="form-control static-input"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  style={{ resize: "none" }}
                  placeholder="Enter new email address"
                />
                <button onClick={() => this.submitPolicy()}>
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
                  Edit
                </button>
                <button
                  className="btn btn-link collapse-view-btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseOne-1"
                >
                  View
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
                  className="form-control static-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter new password"
                />
                <button onClick={() => this.submitPolicy()}>
                  Enter New Password
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
                <button
                  className="btn btn-link collapse-view-btn move-btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#faq-edit"
                  aria-expanded="true"
                  aria-controls="collapseOne-1"
                >
                  Edit
                </button>
                <button
                  className="btn btn-link collapse-view-btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#faq-view"
                  aria-expanded="true"
                  aria-controls="collapseOne-1"
                >
                  View
                </button>
              </h5>
            </div>

            <div
              id="faq-view"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="card-body" style={{ paddingLeft: "2.1rem" }}>
                <span>Forgot Password: currentemail@gmail.com</span>
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
                  onChange={this.inputFAQ.bind(this)}
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
