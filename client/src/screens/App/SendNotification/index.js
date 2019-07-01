import React, { Component } from "react";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: false
    };
  }

  render() {
    return (
      <div className="main-dashboard-container">
        <h3 className="page-title">Send Notification</h3>
        <div className="container-fluid">
          <div className="send-notification-main">
            <div className="send-notification-sender-header">
              <div className="send-to-text-container">
                <span className="send-to-text">Send to:</span>
              </div>
              <div className="send-notification-input-container">
                <select className="form-control send-notification-dropdown">
                  <option>All User</option>
                </select>
                <input
                  className="form-control send-notification-date"
                  placeholder="Date"
                />
              </div>
            </div>

            <div className="send-notification-title-header">
              <input className="form-control " placeholder="Title" />
            </div>

            <div className="send-notification-content-body">
              <textarea
                onClick={() => this.setState({ buttons: true })}
                placeholder="Write here..."
                className="form-control"
                rows="15"
                style={{ resize: "none" }}
              />
              <div className="send-notification-button-container">
                <button
                  className="send-notification-back-btn"
                  onClick={() => this.props.history.push("/pushnotification")}
                >
                  back
                </button>
                <button className="send-notification-button">
                  send notification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
