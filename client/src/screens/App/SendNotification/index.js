import React, { Component } from "react";
import { url } from "../../../config";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: false,
      title: "",
      desc: ""
    };
  }

  /**
  |--------------------------------------------------
  | send notification to server
  |--------------------------------------------------
  */
  sendNotification = () => {
    fetch(`${url}/api/push`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.desc
      })
    })
      .then(res => res.json())

      .then(data => {
        if (data.success === true) {
          alert(data.message);
          this.props.history.push("/pushnotification");
        }
      })

      .catch(err =>
        console.log(
          "Error for the sending notification function at the sending notification page",
          err
        )
      );
  };

  render() {
    return (
      <div className="main-dashboard-container">
        <h3 className="page-title">Send Notification</h3>
        <div className="container-fluid">
          <div className="send-notification-main">
            {/* <div className="send-notification-sender-header">
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
            </div> */}

            <div className="send-notification-title-header">
              <input
                className="form-control "
                placeholder="Title"
                onChange={e => this.setState({ title: e.target.value })}
              />
            </div>

            <div className="send-notification-content-body">
              <textarea
                onChange={e => this.setState({ desc: e.target.value })}
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
                <button
                  className="send-notification-button"
                  onClick={() => this.sendNotification()}
                >
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
