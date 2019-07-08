import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTab: true,
      useragentTab: false,
      merchantTab: false,
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
        {/* {this.state.approveDecline === true ? (
          <div className="modal-opacity" />
        ) : null} */}
        <h3
          className="page-title business-request-title"
          style={{ marginLeft: "1rem" }}
        >
          Transaction
        </h3>
        <div className="business-request-tabs-container">
          {this.state.userTab === false ? (
            <button
              onClick={() =>
                this.setState({
                  userTab: true,
                  useragentTab: false,
                  merchantTab: false
                })
              }
            >
              User
            </button>
          ) : (
            <button
              className="business-request-tabs-container-active"
              onClick={() =>
                this.setState({
                  userTab: true,
                  useragentTab: false,
                  merchantTab: false
                })
              }
            >
              User
            </button>
          )}

          {this.state.useragentTab === false ? (
            <button
              onClick={() =>
                this.setState({
                  userTab: false,
                  useragentTab: true,
                  merchantTab: false
                })
              }
            >
              User Agents
            </button>
          ) : (
            <button
              className="business-request-tabs-container-active"
              onClick={() =>
                this.setState({
                  userTab: false,
                  useragentTab: true,
                  merchantTab: false
                })
              }
            >
              User Agents
            </button>
          )}
          {this.state.merchantTab === false ? (
            <button
              onClick={() =>
                this.setState({
                  userTab: false,
                  useragentTab: false,
                  merchantTab: true
                })
              }
            >
              Merchant
            </button>
          ) : (
            <button
              className="business-request-tabs-container-active"
              onClick={() =>
                this.setState({
                  userTab: false,
                  useragentTab: false,
                  merchantTab: true
                })
              }
            >
              Merchant
            </button>
          )}
        </div>
        <div className="container-fluid" style={{ paddingTop: "5.2rem" }}>
          {this.state.userTab === true ? (
            <Table
              head={data.tHeadUserTransaction}
              body={data.tBodyUserTransaction}
              method={this.passedFromChild}
            />
          ) : null}
          {this.state.useragentTab === true ? (
            <Table
              head={data.tHeadUserAgentTransaction}
              body={data.tBodyUserAgentTransaction}
              method={this.passedFromChild}
            />
          ) : null}
          {this.state.merchantTab === true ? (
            <Table
              head={data.tHeadMerchantTransaction}
              body={data.tBodyMerchantTransaction}
              method={this.passedFromChild}
            />
          ) : null}
          {/* {this.state.approveDecline === true ? (
            <div className="approve-decline-container">
              <button>Approve</button>
              <button onClick={() => this.setState({ approveDecline: false })}>
                Decline
              </button>
            </div>
          ) : null} */}
        </div>
      </div>
    );
  }
}
