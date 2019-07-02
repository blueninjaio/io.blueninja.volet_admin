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

  componentDidMount() {
    this.fetchBusiness();
  }

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
        console.log(data);
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

          console.log("Decline array", decline);

          // this.setState({ approved });
          // this.setState({ decline });
          // this.setState({ pending });

          let pendingReceived = [];
          // let ids = [];
          pending.map(x => {
            let pend = {
              f_name: x.f_name,
              l_name: x.l_name,
              company_name: x.company_name,
              isPending: "is Pending",
              dateCreated: x.dateCreated
            };
            this.state.ids.push(x._id);

            pendingReceived.push(pend);
          });

          // this.setState({ ids });

          console.log("IDS", this.state.ids);

          this.setState({ pending: pendingReceived });
          console.log("Pending array", pending);

          let approveReceived = [];
          approved.map(x => {
            let approve = {
              f_name: x.f_name,
              l_name: x.l_name,
              company_name: x.company_name,
              isApproved: "is Approved",
              dateCreated: x.dateCreated
            };
            approveReceived.push(approve);
          });

          this.setState({ approved: approveReceived });
          console.log("Approved array", approved);

          let declineReceived = [];
          decline.map(x => {
            let decline = {
              f_name: x.f_name,
              l_name: x.l_name,
              company_name: x.company_name,
              isDeclined: "is Declined",
              dateCreated: x.dateCreated
            };
            declineReceived.push(decline);
          });

          this.setState({ decline: declineReceived });
          console.log("Decline array", decline);

          // console.log("Final Merchants: ", business);
          // this.setState({ business, businessData: data.businesses });
        }
      })
      .catch(err => {
        console.log("Error for business page", err);

        alert(
          "Error connecting to server",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  filterBusiness = () => {};

  /**
  |--------------------------------------------------
  | receives and sets state 
    selected row data from the Table component
  |--------------------------------------------------
  */
  passedFromChild = (i, state) => {
    console.log(state);

    // this.setState({ approveDecline: state });
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
              body={this.state.pending}
              button={data.tBodyButton}
              method={this.passedFromChild}
              id={this.state.ids}
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
