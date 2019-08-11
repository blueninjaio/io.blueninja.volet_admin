import React, { Component } from "react";
import TableCheckBox from "../../../components/TableCheckbox";
import data from "../../../data/data.json";
import { url } from "../../../config";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: false,
      bType: [],
      name: "",
      description: "",
      ids: [],
      isActive: []
    };
  }

  /**
  |--------------------------------------------------
  | on load page fetches all categories information
  |--------------------------------------------------
  */
  componentDidMount() {
    this.onLoadFetchBTypes();
  }

  /**
  |--------------------------------------------------
  | fetches all business type data from api
  |--------------------------------------------------
  */
  onLoadFetchBTypes = () => {
    fetch(`${url}/api/business_type`, {
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
          this.setState({ bType: data.types });
        }
      })
      .catch(err => {
        console.log("Error for banks page, for fetching banks data", err);

        alert(
          "Error for banks page, for fetching banks data",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | method to use the state from the table and the row that is clicked
  |--------------------------------------------------
  */
  passedFromChild = (i, state) => {
    console.log(i);
  };

  /**
  |--------------------------------------------------
  | add a new business type
  |--------------------------------------------------
  */
  onActionAddBType = async () => {
    await this.setState({ popup: false });

    fetch(`${url}/api/business_type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description
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

  render() {
    return (
      <div className="dashboard-container">
        {this.state.popup === true ? (
          <div className="cat-modal-opacity" />
        ) : null}
        <h3 className="main-cat-page-title">Business Types</h3>
        <button
          type="button"
          className="btn btn-primary add-cat-btn"
          onClick={() => this.setState({ popup: true })}
        >
          <img
            src="https://png.pngtree.com/svg/20161118/6fc980719c.svg"
            alt="add-modal-icon"
          />
        </button>
        {this.state.popup === true ? (
          <div className="cat-popup-container">
            <div>
              <h3 className="cat-pop-title">Add New Business Type</h3>
            </div>
            <div>
              <input
                placeholder="Enter a new business type"
                className="form-control cat-pop-input"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
              <input
                style={{ marginTop: "1rem" }}
                placeholder="Enter business type description"
                className="form-control cat-pop-input"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
              <button
                className="btn cat-save-btn"
                onClick={() => this.onActionAddBType()}
              >
                Add
              </button>
            </div>
          </div>
        ) : null}
        <div
          className="container-fluid mobile-container"
          style={{ paddingTop: "7.5rem" }}
        >
          <TableCheckBox
            head={data.tHeadBanksTable}
            body={this.state.bType}
            toggle={"business_type"}
          />
        </div>
      </div>
    );
  }
}
