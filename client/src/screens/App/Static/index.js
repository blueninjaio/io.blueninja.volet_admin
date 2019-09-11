import React, { Component } from "react";
import { url } from "../../../config";
import api from "../../../api/index";
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
    api
      .getStatic()

      .then(data => {
        if (data.static.length >= 1) {
          this.setState({ receivedFAQ: data.static[0].faq });
          this.setState({ receivedPolicy: data.static[0].policies });
        }
      })

      .catch(err =>
        console.log("getting static from server, on static page", err)
      );
  };

  /**
  |--------------------------------------------------
  | submits policy state/string to the api
  |--------------------------------------------------
  */
  submitPolicy = () => {
    api
      .postPolicy(this.state.policy)

      .then(data => {
        console.log(data);
        if (data.success === true) {
          alert(data.message);
          console.log(data.success);
          window.location.reload();
        }
      })

      .catch(err =>
        console.log("getting policy from server, on policy page", err)
      );
  };
  /**
  |--------------------------------------------------
  | submits faq state/string to the api
  |--------------------------------------------------
  */
  submitFAQ = () => {
    api
      .postFAQ(this.state.faq)

      .then(data => {
        console.log(data);
        if (data.success === true) {
          alert(data.message);
          console.log(data.success);
          window.location.reload();
        }
      })

      .catch(err => console.log("getting faq from server, on faq page", err));
  };

  render() {
    return (
      <div className="main-dashboard-container">
        <h3 className="page-title static-title">Static Pages</h3>
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
                  Policies
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
              <div className="card-body">{this.state.receivedPolicy}</div>
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
                  placeholder="Enter policy"
                />
                <button onClick={() => this.submitPolicy()}>
                  Submit Policy
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
                  Contact Support
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
              <div className="card-body">
                <span>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </span>
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
                  placeholder="Enter email"
                />
                <input
                  type="address"
                  className="form-control static-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter phone number"
                />
                <textarea
                  className="form-control static-input"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  style={{ resize: "none" }}
                  placeholder="Enter Address"
                />
                <textarea
                  className="form-control static-input"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  style={{ resize: "none" }}
                  placeholder="Contact Reason"
                />
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
                  FAQ
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
              <div className="card-body">{this.state.receivedFAQ}</div>
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
                  placeholder="Enter faq"
                />

                <button onClick={() => this.submitFAQ()}>Submit FAQ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
