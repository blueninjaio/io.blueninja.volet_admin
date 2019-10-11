import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
import { url } from "../../../config";
import api from "../../../api";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingTab: true,
      approvedTab: false,
      declineTab: false,
      approveDecline: false,
      approved: [],
      pending: [],
      decline: [],
      business: [],
      ids: [],
      type: "",
      approveType: "",
      declineType: ""
    };
  }

  componentWillUnmount() {
    // this.fetchBusiness();
  }

  /**
  |--------------------------------------------------
  | on load get all business request data
  |--------------------------------------------------
  */
  componentDidMount() {
     this.fetchBusiness();
  }

  /**
  |--------------------------------------------------
  | fetches all business request data from api
  |--------------------------------------------------
  */
  fetchBusiness = async () => {
      console.log("Fetching users");
      api.getUsers()
      .then(data => {
          console.log(data);
        if (data.success) {
          let approved = data.users.filter(user => user.account_type === 'UserAgent');
          let decline = [];
          let pending = data.users.filter(user => user.account_type === 'User' && user.agent && user.agent.applied);
            console.log(data.users, approved, pending)

          let pendingReceived = pending.map((x, i) => {
              let pend = {
                  no: i,
                  user_id: x.contact,
                  dateCreated: x.dateCreated,
                  isPending: "is Pending"
              };
              this.state.ids.push(x._id);
              return pend;
          });

          this.setState({ pending: pendingReceived });

          let approveReceived = approved.map((x, i) => {
              let approve = {
                  no: i,
                  user_id: x.contact,
                  isPending: "is Approved",
                  dateCreated: x.dateCreated
              };
              return approve;
          });

          this.setState({ approved: approveReceived });

          let declineReceived = decline.map((x, i) => {
              let decline = {
                  no: i,
                  user_id: x.contact,
                  isPending: "is Declined",
                  dateCreated: x.dateCreated
              };
              return decline;
          });

          this.setState({ decline: declineReceived });
        }
      })
      .catch(err => {
          console.log(err);
        alert(
          "Error connecting to server from the agent request page",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | receives and sets state 
    selected row data from the Table component
  |--------------------------------------------------
  */
  passedFromChild = (i, state) => {
    // console.log(state);
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
          Agent Requests
        </h3>
        <div className="business-request-tabs-container">
          {this.state.pendingTab === true ? (
            <button
              className="business-request-tabs-container-active"
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
          ) : (
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
          )}
          {this.state.approvedTab === true ? (
            <button
              className="business-request-tabs-container-active"
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
          ) : (
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
          )}

          {this.state.declineTab === true ? (
            <button
              className="business-request-tabs-container-active"
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
          ) : (
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
          )}
        </div>
        <div
          className="container-fluid bR-mobile-container"
          style={{ paddingTop: "5.2rem" }}
        >
          {this.state.pendingTab === true ? (
            <Table
              head={data.tHeadARequestPendingTable}
              body={this.state.pending}
              button={data.tBodyButton}
              method={this.passedFromChild}
              id={this.state.ids}
              model={"agent"}
            />
          ) : null}
          {this.state.approvedTab === true ? (
            <Table
              head={data.tHeadARequestTable}
              body={this.state.approved}
              method={this.passedFromChild}
            />
          ) : null}
          {this.state.declineTab === true ? (
            <Table
              head={data.tHeadARequestTable}
              body={this.state.decline}
              method={this.passedFromChild}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
