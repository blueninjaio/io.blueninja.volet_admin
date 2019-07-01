import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
        <h3
          className="page-title business-request-title"
          style={{ marginLeft: "1rem" }}
        >
          Feedback
        </h3>
        <div className="container-fluid" style={{ paddingTop: "8rem" }}>
          <Table
            head={data.tHeadFeedbackTable}
            body={data.tBodyFeedback}
            method={this.passedFromChild}
          />
        </div>
      </div>
    );
  }
}
