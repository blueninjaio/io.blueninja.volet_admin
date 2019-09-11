import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
import { url } from "../../../config";

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
    // this.fetchBusiness();
  }

  /**
  |--------------------------------------------------
  | fetches all business request data from api
  |--------------------------------------------------
  */
  fetchBusiness = async () => {
    fetch(`${url}/api/agents`, {
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
          let business = data.agents;
          let approved = [];
          let decline = [];
          let pending = [];

          business.map(x =>
            x.isPending
              ? pending.push(x)
              : x.isApproved
              ? approved.push(x)
              : x.isDeclined
              ? decline.push(x)
              : null
          );

          let pendingReceived = [];

          pending.map((x, i) => {
            // console.log(x);
            if (x.user_id !== null) {
              fetch(`${url}/api/users/id`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                  _id: x.user_id
                })
              })
                .then(res => res.json())

                .then(data => {
                  if (data.success === true) {
                    this.setState({ type: data.user.user_type });
                    let pend = {
                      no: i,
                      user_id: this.state.type,
                      dateCreated: x.dateCreated,
                      isPending: "is Pending"
                    };
                    this.state.ids.push(x.user_id);

                    pendingReceived.push(pend);
                    return pendingReceived;
                  }
                })

                .catch(err => console.log(err));
            }
          });

          this.setState({ pending: pendingReceived });

          let approveReceived = [];
          approved.map((x, i) => {
            if (x.user_id !== null) {
              fetch(`${url}/api/users/id`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                  _id: x.user_id
                })
              })
                .then(res => res.json())

                .then(data => {
                  if (data.success === true) {
                    this.setState({ approveType: data.user.user_type });
                    let approve = {
                      no: i,
                      user_id: this.state.approveType,
                      isPending: "is Approved",
                      dateCreated: x.dateCreated
                    };
                    approveReceived.push(approve);
                    return approveReceived;
                  }
                })

                .catch(err => console.log(err));
            }
          });

          this.setState({ approved: approveReceived });

          let declineReceived = [];
          decline.map((x, i) => {
            if (x.user_id !== null) {
              fetch(`${url}/api/users/id`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                  _id: x.user_id
                })
              })
                .then(res => res.json())

                .then(data => {
                  if (data.success === true) {
                    this.setState({ declineType: data.user.user_type });
                    let decline = {
                      no: i,
                      user_id: this.state.declineType,
                      isPending: "is Declined",
                      dateCreated: x.dateCreated
                    };
                    declineReceived.push(decline);
                    return declineReceived;
                  }
                })

                .catch(err => console.log(err));
            }
          });

          this.setState({ decline: declineReceived });
        }
      })
      .catch(err => {
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
