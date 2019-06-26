import React, { Component } from "react";

/**
|--------------------------------------------------
| renders static pages
|--------------------------------------------------
*/
export default class index extends Component {
  render() {
    return (
      <div className="dashboard-container">
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
              <div className="card-body">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </div>
            </div>
            <div
              id="collapseOne-1"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                <input
                  type="text"
                  className="form-control static-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter policy-header"
                />
                <input
                  type="text"
                  className="form-control static-input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter policy-type"
                />
                <textarea
                  className="form-control static-input"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  style={{ resize: "none" }}
                  placeholder="Enter policy"
                />
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
        </div>
      </div>
    );
  }
}
