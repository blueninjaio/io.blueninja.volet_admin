import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
import api from "../../../api/index";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
        code: "",
      name: "",
      desc: "",
      amount: "",
      quantity: "",
      expiry: "",
      addVoucher: false,
      vouchers: [],
      rowSelected: false,
      voucherDetails: [],
      approved: []
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
    let arr = this.state.approved;
    arr.push(this.state.voucherDetails[i]);

    this.setState({ rowSelected: state });
  };

  /**
  |--------------------------------------------------
  | add a voucher
  |--------------------------------------------------
  */
  addVoucher = () => {
    this.setState({ addVoucher: false });

    api
      .postVouchers(
          this.state.code,
        this.state.name,
        this.state.desc,
        parseInt(this.state.amount),
        parseInt(this.state.quantity),
        this.state.expiry
      )

      .then(data => {
        if (data.success === true) {
          alert(data.message);
          window.location.reload();
        }
      })

      .catch(err =>
        console.log("adding a voucher function error on the voucher page", err)
      );
  };

  /**
  |--------------------------------------------------
  | get all voucher info and display it
  |--------------------------------------------------
  */
  getVouchers = () => {
    api
      .getVouchers()
      .then(data => {
        if (data.success) {
          let vouchers = [];
          let voucherDetails = [];

          data.vouchers.map(x => {
            let user = {
                code: x.code,
              name: x.name,
              description: x.description,
              amount: x.amount,
              quantity: x.quantity,
              expiry: x.expiry
            };

            let voucherUser = {
                voucher_code: x.code,
              voucher_name: x.name,
              voucher_desc: x.description,
              voucher_usage: x.usage
            };

            vouchers.push(user);
            voucherDetails.push(voucherUser);

            this.setState({ voucherDetails });
            console.log(this.state.voucherDetails);
            return vouchers;
          });

          this.setState({ vouchers });
        }
      })
      .catch(err => {
        console.log("Error for vouchers  page", err);

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
              <button
                className="categoryXBtn"
                onClick={() => this.setState({ addVoucher: false })}
              >
                <img
                  alt="img"
                  src="https://image.flaticon.com/icons/png/512/458/458595.png"
                />
              </button>
            </div>
            <div>
                <input
                    className="form-control voucher-pop-input"
                    value={this.state.code}
                    placeholder="Code"
                    onChange={e => this.setState({ code: e.target.value })}
                />
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
        {this.state.rowSelected === true ? (
          <div>
            {this.state.approved.map((x, i) => (
              <div className="view-business-container" key={i}>
                <button
                  className="exit-btn-view-business"
                  onClick={() => this.setState({ rowSelected: false })}
                >
                  <img
                    alt="selected-user-x-icon"
                    src="https://img.pngio.com/index-of-v2-imgs-x-png-black-and-white-256_256.png"
                  />
                </button>

                  <div
                      className="business-email-container"
                      style={{ marginTop: "6rem" }}
                  >
                      <span>Voucher Code: </span>
                      <span className="email-span">{x.voucher_code} </span>
                  </div>
                <div
                  className="business-email-container"
                  style={{ marginTop: "6rem" }}
                >
                  <span>Voucher Name: </span>
                  <span className="email-span">{x.voucher_name} </span>
                </div>
                <div
                  className="business-email-container"
                  style={{ marginBottom: "1rem" }}
                >
                  <span>Voucher Description: </span>
                  <span className="email-span">{x.voucher_desc} </span>
                </div>
                <span style={{ marginLeft: "4rem" }}>Usage</span>
                <div className="business-email-container">
                  <ul className="usage-container">
                    {x.voucher_usage
                      ? x.voucher_usage.map((y, index) => (
                          <li key={index}> {y.user}</li>
                        ))
                      : null}
                  </ul>
                </div>
                {/* <div className="border-view-business" /> */}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}
