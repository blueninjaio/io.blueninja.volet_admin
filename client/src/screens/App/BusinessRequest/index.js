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
      ids: []
    };
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
    fetch(`${url}/api/business`, {
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
          let business = data.businesses;
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
              : console.log("No Status")
          );

          let pendingReceived = [];

          pending.map((x, i) => {
            let pend = {
              no: i,
              f_name: x.f_name,
              l_name: x.l_name,
              company_name: x.company_name,
              isPending: "is Pending",
              dateCreated: x.dateCreated
            };
            this.state.ids.push(x._id);

            pendingReceived.push(pend);
            return pendingReceived;
          });

          this.setState({ pending: pendingReceived });

          let approveReceived = [];
          approved.map((x, i) => {
            let approve = {
              no: i,
              f_name: x.f_name,
              l_name: x.l_name,
              company_name: x.company_name,
              isApproved: "is Approved",
              dateCreated: x.dateCreated
            };
            approveReceived.push(approve);
            return approveReceived;
          });

          this.setState({ approved: approveReceived });

          let declineReceived = [];
          decline.map((x, i) => {
            let decline = {
              no: i,
              f_name: x.f_name,
              l_name: x.l_name,
              company_name: x.company_name,
              isDeclined: "is Declined",
              dateCreated: x.dateCreated
            };
            declineReceived.push(decline);
            return declineReceived;
          });

          this.setState({ decline: declineReceived });
        }
      })
      .catch(err => {
        console.log(
          "Error for fetching business from the business request page",
          err
        );

        alert(
          "Error for fetching business from the business request page",

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
    console.log(state);
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
          style={{ paddingTop: "6.7rem" }}
        >
          {this.state.pendingTab === true ? (
            <Table
              head={data.tHeadPendingBusinessTable}
              body={this.state.pending}
              button={data.tBodyButton}
              method={this.passedFromChild}
              id={this.state.ids}
              model={"business"}
            />
          ) : null}
          {this.state.approvedTab === true ? (
            <Table
              head={data.tHeadApprovedBusinessTable}
              body={this.state.approved}
              method={this.passedFromChild}
            />
          ) : null}
          {this.state.declineTab === true ? (
            <Table
              head={data.tHeadDeclineBusinessTable}
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
