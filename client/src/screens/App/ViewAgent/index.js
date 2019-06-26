import React, { Component } from "react";

/**
|--------------------------------------------------
| renders view agent page
|--------------------------------------------------
*/
export default class index extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <h3 className="page-title">View Agent</h3>
        <div className="voucher-full-desc-container view-merchant-container">
          <div className="merchant-img-container">
            <img
              alt="view-agent-img"
              src="http://www.venmond.com/demo/vendroid/img/avatar/big.jpg"
            />
          </div>
          <div className="merchant-full-desc-container">
            <span>Name: Sarah Rock</span>
            <span>Email: test@gmail.com</span>
            <span>Phone Number: +6012-3456789</span>
          </div>
        </div>
      </div>
    );
  }
}
