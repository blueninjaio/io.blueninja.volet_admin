import React, { Component } from "react";
import Card from "../../../components/Card";

export class index extends Component {
  viewMerchant = () => {
    this.props.history.push("/viewmerchant");
  };

  render() {
    return (
      <div className="main-dashboard-container">
        <h3 className="page-title">Merchants</h3>
        <div className="container-fluid">
          <Card />
        </div>
      </div>
    );
  }
}

export default index;
