import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
import { url } from "../../../config";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: false,
      categories: [],
      title: ""
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    fetch(`${url}/api/category`, {
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
          let categories = [];
          data.categories.map(x => {
            let cat = {
              title: x.title,
              date: x.dateCreated
            };
            categories.push(cat);
          });
          this.setState({ categories });
          console.log("Categories: ", this.state.categories);
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

  passedFromChild = (i, state) => {
    console.log(i);
  };

  addCategory = async () => {
    await this.setState({ popup: false });

    fetch(`${url}/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: this.state.title
      })
    })
      .then(res => res.json())

      .then(data => {
        if (data.success === true) {
          alert(data.message);
          //   window.location.reload();
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
        <h3 className="main-cat-page-title">Categories</h3>
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
              <h3 className="cat-pop-title">Category Title</h3>
            </div>
            <div>
              <input
                className="form-control cat-pop-input"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
              <button
                className="btn cat-save-btn"
                onClick={() => this.addCategory()}
              >
                Save
              </button>
            </div>
          </div>
        ) : null}
        <div
          className="container-fluid mobile-container"
          style={{ paddingTop: "7.5rem" }}
        >
          <Table
            head={data.tHeadCatTable}
            body={this.state.categories}
            method={this.passedFromChild}
          />
        </div>
      </div>
    );
  }
}
