import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
import { url } from "../../../config";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      filterUsers: "all",
      notification: [],
      sendState: false,
      sendData: null
    };
  }

  /**
  |--------------------------------------------------
  | on page loads runs the getPush() function
  |--------------------------------------------------
  */
  componentDidMount() {
    this.getPush();
  }

  /**
  |--------------------------------------------------
  | gets the row clicked and the state of the table row
  |--------------------------------------------------
  */
  passedFromChild = (i, state) => {
    console.log(i);
  };

  /**
  |--------------------------------------------------
  | gets all push notification from api
  |--------------------------------------------------
  */
  getPush = () => {
    fetch(`${url}/api/push`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          let notification = [];
          data.push.map(x => {
            let user = {
              title: x.title,
              description: x.description,
              createdAt: x.createdAt
            };
            notification.push(user);
            return notification
          });

          this.setState({ notification });
        }
      })
      .catch(err => {
        console.log("Error for users page", err);

        alert(
          "Error connecting to server",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header pn-header-container">
          <h3 className="table-page-title">Notification</h3>
          <div className="filter-users-container">
            <select className="form-control filter-pages">
              <option value="all">All</option>
              <option value="email">Email</option>
              <option value="gmail">Gmail</option>
              <option value="fb">Facebook</option>
            </select>
          </div>
        </div>

        <div className="container-fluid" style={{ paddingTop: "13rem" }}>
          <Table
            head={data.tHeadPushTable}
            body={this.state.notification}
            method={this.passedFromChild}
          />
          <button
            className="send-mail-btn"
            onClick={() => this.props.history.push("/sendnotification")}
          >
            <img
              alt='img'
              src="https://image.flaticon.com/icons/png/512/131/131155.png"
              style={{ height: "100%", width: "100%" }}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default index;
