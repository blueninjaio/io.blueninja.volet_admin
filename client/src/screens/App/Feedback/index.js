import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
import { url } from "../../../config";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedback: []
    };
  }

  /**
  |--------------------------------------------------
  | on load runs the fetchFeedback
  |--------------------------------------------------
  */
  componentDidMount() {
    this.fetchAllFeedback();
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

  /**
  |--------------------------------------------------
  | fetches all feedback info from the api
  |--------------------------------------------------
  */
  fetchAllFeedback = () => {
    fetch(`${url}/api/feedbacks`, {
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
          let feedback = [];
          data.feedbacks.map(x => {
            let user = {
              _id: x._id,
              rating: x.rating,
              description: x.description,
              dateCreated: x.dateCreated
            };
            feedback.push(user);
            return feedback
          });

          this.setState({ feedback });
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
            body={this.state.feedback}
            method={this.passedFromChild}
          />
        </div>
      </div>
    );
  }
}
