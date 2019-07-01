import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
// import { url } from "../../../config";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      filterUsers: "all",
      merchants: [],
      sendState: false,
      sendData: null
    };
  }

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
            body={data.tBodyPushTable}
            method={this.passedFromChild}
          />
          <button
            className="send-mail-btn"
            onClick={() => this.props.history.push("/sendnotification")}
          >
            <img
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
