import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
import { url } from "../../../config";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      desc: "",
      amount: "",
      quantity: "",
      expiry: "",
      addVoucher: false,
      vouchers: []
    };
  }

  /**
  |--------------------------------------------------
  | on page load run the getVouchers function
  |--------------------------------------------------
  */
  componentDidMount() {
    this.getVouchers();
  }

  /**
  |--------------------------------------------------
  | gets the state of the table row that has been clicked
  |--------------------------------------------------
  */
  passedFromChild = (i, state) => {
    console.log(i);
  };

  /**
  |--------------------------------------------------
  | add a voucher
  |--------------------------------------------------
  */
  addVoucher = () => {
    this.setState({ addVoucher: false });

    fetch(`${url}/api/vouchers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.desc,
        amount: parseInt(this.state.amount),
        quantity: parseInt(this.state.quantity),
        expiry: this.state.expiry
      })
    })
      .then(res => res.json())

      .then(data => {
        if (data.success === true) {
          alert(data.message);
          window.location.reload();
        }
      })

      .catch(err => console.log(err));
  };

  /**
  |--------------------------------------------------
  | get all voucher info and display it
  |--------------------------------------------------
  */
  getVouchers = () => {
    fetch(`${url}/api/vouchers`, {
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
          let vouchers = [];
          data.vouchers.map(x => {
            let user = {
              name: x.name,
              description: x.description,
              amount: x.amount,
              quantity: x.quantity,
              expiry: x.expiry
            };
            vouchers.push(user);
          });

          this.setState({ vouchers });
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

  /**
  |--------------------------------------------------
  | navigates to view voucher page
  |--------------------------------------------------
  */
  viewVoucher = () => {
    this.props.history.push("/viewvoucher");
  };

  render() {
    return (
      <div className="dashboard-container">
        {this.state.addVoucher === true ? (
          <div className="cat-modal-opacity" />
        ) : null}
        <h3 className="page-title voucher-main-title">Vouchers</h3>
        <button
          type="button"
          className="btn btn-primary add-voucher-btn"
          onClick={() => this.setState({ addVoucher: true })}
        >
          <img
            src="https://png.pngtree.com/svg/20161118/6fc980719c.svg"
            alt="add-modal-icon"
          />
        </button>

        {this.state.addVoucher === true ? (
          <div className="voucher-popup-container">
            <div>
              <h3 className="cat-pop-title">Category Title</h3>
            </div>
            <div>
              <input
                className="form-control voucher-pop-input"
                value={this.state.name}
                placeholder="Name"
                onChange={e => this.setState({ name: e.target.value })}
              />
              <input
                className="form-control voucher-pop-input"
                value={this.state.desc}
                placeholder="Description"
                onChange={e => this.setState({ desc: e.target.value })}
              />
              <input
                className="form-control voucher-pop-input"
                value={this.state.amount}
                placeholder="Amount"
                type="number"
                onChange={e => this.setState({ amount: e.target.value })}
              />
              <input
                className="form-control voucher-pop-input"
                value={this.state.quantity}
                placeholder="Quantity"
                type="number"
                onChange={e => this.setState({ quantity: e.target.value })}
              />
              <input
                className="form-control voucher-pop-input"
                value={this.state.expiry}
                type="date"
                placeholder="Expiry"
                onChange={e => this.setState({ expiry: e.target.value })}
              />
              <button
                className="btn cat-save-btn"
                onClick={() => this.addVoucher()}
              >
                Save
              </button>
            </div>
          </div>
        ) : null}
        <div className="container-fluid" style={{ paddingTop: "7.5rem" }}>
          <Table
            head={data.tHeadVoucherTable}
            body={this.state.vouchers}
            method={this.passedFromChild}
          />
        </div>
      </div>
    );
  }
}
