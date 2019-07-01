import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingTab: true,
      approvedTab: false,
      declineTab: false,
      approveDecline: false
    };
  }

  /**
  |--------------------------------------------------
  | receives and sets state 
    selected row data from the Table component
  |--------------------------------------------------
  */
  passedFromChild = (i, state) => {
    console.log(state);

    this.setState({ approveDecline: state });
  };

  render() {
    return (
      <div className="dashboard-container">
        {this.state.approveDecline === true ? (
          <div className="modal-opacity" />
        ) : null}
        <h3
          className="page-title business-request-title"
          style={{ marginLeft: "1rem" }}
        >
          Business Requests
        </h3>
        <div className="business-request-tabs-container">
          <button
            onClick={() =>
              this.setState({
                pendingTab: true,
                approvedTab: false,
                declineTab: false
              })
            }
          >
            Pending
          </button>
          <button
            onClick={() =>
              this.setState({
                pendingTab: false,
                approvedTab: true,
                declineTab: false
              })
            }
          >
            Approved
          </button>
          <button
            onClick={() =>
              this.setState({
                pendingTab: false,
                approvedTab: false,
                declineTab: true
              })
            }
          >
            Decline
          </button>
        </div>
        <div
          className="container-fluid bR-mobile-container"
          style={{ paddingTop: "5.2rem" }}
        >
          {this.state.pendingTab === true ? (
            <Table
              head={data.tHeadPendingBusinessTable}
              body={data.tBodyPendingBusinessTable}
              method={this.passedFromChild}
            />
          ) : null}
          {this.state.approvedTab === true ? (
            <Table
              head={data.tHeadApprovedBusinessTable}
              body={data.tBodyApprovedBusinessTable}
              method={this.passedFromChild}
            />
          ) : null}
          {this.state.declineTab === true ? (
            <Table
              head={data.tHeadDeclineBusinessTable}
              body={data.tBodyDeclineBusinessTable}
              method={this.passedFromChild}
            />
          ) : null}
          {this.state.approveDecline === true ? (
            <div className="approve-decline-container">
              <button>Approve</button>
              <button onClick={() => this.setState({ approveDecline: false })}>
                Decline
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
