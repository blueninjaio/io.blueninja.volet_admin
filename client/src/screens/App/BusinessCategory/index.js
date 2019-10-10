import React, { Component } from "react";
import TableCheckBox from "../../../components/TableCheckbox";
import data from "../../../data/data.json";
import { url } from "../../../config";
import api from "../../../api/index";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: false,
      bCategory: [],
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
    // this.onLoadFetchBCategory();
  }

  /**
  |--------------------------------------------------
  | fetches all category data from api
  |--------------------------------------------------
  */
  onLoadFetchBCategory = () => {
    api
      .getBusinessCategory()
      .then(data => {
        if (data.success) {
          console.log(data.categories);
          this.setState({ bCategory: data.categories });
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
  | add a new bank
  |--------------------------------------------------
  */
  onActionAddBCategory = async () => {
    await this.setState({ popup: false });

    api
      .postBusinessCategory(this.state.name, this.state.description)

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
        <h3 className="main-cat-page-title">Business Category</h3>
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
              <h3 className="cat-pop-title">Add New Business Category</h3>
            </div>
            <div>
              <input
                placeholder="Enter a new category name"
                className="form-control cat-pop-input"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
              <input
                style={{ marginTop: "1rem" }}
                placeholder="Enter a new category description"
                className="form-control cat-pop-input"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
              <button
                className="btn cat-save-btn"
                onClick={() => this.onActionAddBCategory()}
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
            body={this.state.bCategory}
            toggle={"business_category"}
          />
        </div>
      </div>
    );
  }
}
