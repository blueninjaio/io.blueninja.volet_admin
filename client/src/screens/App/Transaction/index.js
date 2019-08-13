import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
import { url } from "../../../config";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTab: true,
      useragentTab: false,
      merchantTab: false,
      approveDecline: false,
      transactions: {
        user: [],
        userAgent: [],
        merchant: [],
      }
    };
  }
  componentDidMount() {
    this.fetchTransactions("user");
  }

  /**
   |--------------------------------------------------
   | receives and sets state selected row data from the Table component
   |--------------------------------------------------
   */
  passedFromChild = (i, state) => {
    console.log(state);

    this.setState({ approveDecline: state });
  };

  fetchTransactions = (type) => {

    fetch(`${url}/api/transaction/` + type, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          let formattedResults = [];
          data.transactions.map(x => {
            let {
              from, to, business, bType, type, amount, date
            } = x;
            let display = {
              from,
              to,
              business,
              bType,
              type,
              amount,
              date
            };
            Object.keys(display).forEach(key => display[key] === undefined && delete display[key]);
            formattedResults.push(display);
          });
          console.log(formattedResults);
          this.setState(state => {
            state.transactions[type] = formattedResults;
            return state;
          });
        }
      })
      .catch(err => {
        alert(
          "Error fetching transaction records.",
          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  switchTab(state) {
    console.log(state);
    let { userTab, useragentTab, merchantTab } = state;
    if (userTab) {
      this.fetchTransactions("user");
    }
    if (useragentTab) {
      this.fetchTransactions("userAgent");
    }
    if (merchantTab) {
      this.fetchTransactions("merchant");
    }
    this.setState({
      userTab: userTab || false,
      useragentTab: useragentTab || false,
      merchantTab: merchantTab || false
    });
  }

  render() {
    return (
      <div className="dashboard-container">
        <h3
          className="page-title business-request-title"
          style={{ marginLeft: "1rem" }}
        >
          Transaction
        </h3>
        <div className="business-request-tabs-container">
          {!this.state.userTab ? (
            <button
              onClick={() =>
                this.switchTab({
                  userTab: true
                })
              }
            >
              User
            </button>
          ) : (
            <button
              className="business-request-tabs-container-active"
              onClick={() =>
                this.switchTab({
                  userTab: true
                })
              }
            >
              User
            </button>
          )}

          {!this.state.useragentTab ? (
            <button
              onClick={() =>
                this.switchTab({
                  useragentTab: true,
                })
              }
            >
              User Agents
            </button>
          ) : (
            <button
              className="business-request-tabs-container-active"
              onClick={() =>
                this.switchTab({
                  useragentTab: true
                })
              }
            >
              User Agents
            </button>
          )}
          {!this.state.merchantTab ? (
            <button
              onClick={() =>
                this.switchTab({
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
                this.switchTab({
                  merchantTab: true
                })
              }
            >
              Merchant
            </button>
          )}
        </div>
        <div className="container-fluid" style={{ paddingTop: "5.2rem" }}>
          {this.state.userTab ? (
            <Table
              head={data.tHeadUserTransaction}
              body={this.state.transactions.user}
              method={this.passedFromChild}
            />
          ) : null}
          {this.state.useragentTab ? (
            <Table
              head={data.tHeadUserAgentTransaction}
              body={this.state.transactions.userAgent}
              method={this.passedFromChild}
            />
          ) : null}
          {this.state.merchantTab ? (
            <Table
              head={data.tHeadMerchantTransaction}
              body={this.state.transactions.merchant}
              method={this.passedFromChild}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
