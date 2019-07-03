import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
import { url } from "../../../config";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      filterUsers: "all",
      users: [],
      queryArray: [],
      sendState: false,
      sendData: null
    };
  }

  /**
  |--------------------------------------------------
  | receives and sets state 
    selected row data from the Table component
  |--------------------------------------------------
  */
  passedFromChild = (i, state) => {
    let arr = this.state.sendData;
    let send = this.state.sendState;

    this.setState({ sendData: arr });
    this.setState({ sendState: send });
  };

  /**
  |--------------------------------------------------
  | on load page calls fetchAllUsers function
  |--------------------------------------------------
  */
  componentDidMount() {
    this.fetchAllUsers();
  }

  /**
  |--------------------------------------------------
  | fetches all data for users from api and stores
    in an array
  |--------------------------------------------------
  */
  fetchAllUsers = () => {
    fetch(`${url}/api/users`, {
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
          let users = [];
          data.users.map(x => {
            let user = {
              f_name: x.f_name,
              l_name: x.l_name,
              email: x.email,
              contact: x.contact,
              facebook_id: x.facebook_id,
              google_id: x.google_id,
              credits: x.credits,
              dateCreated: x.dateCreated
            };
            users.push(user);
          });

          console.log("Final Users:", users);
          this.setState({ users });
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
  | changes state on click toggle button
  |--------------------------------------------------
  */
  toggle = async () => {
    await this.setState({ isChecked: !this.state.isChecked });
    console.log(this.state.isChecked);
    if (!this.state.isChecked) {
      console.log("Users Page");
    } else if (this.state.isChecked) {
      setTimeout(() => {
        this.props.history.push("/useragent");
      }, 400);
    }
  };

  updateSearch = async e => {
    let search = e.target.value;

    let queryArray = this.state.users;

    let newArray = [];

    queryArray.map(x => {
      if (x.f_name.includes(search) || x.l_name.includes(search)) {
        newArray.push(x);
      }
    });

    this.setState({ queryArray: newArray });
  };
  /**
  |--------------------------------------------------
  | renders users page
  |--------------------------------------------------
  */
  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h3 className="table-page-title">Users</h3>
          {/* <div className="filter-users-container">
            <div className="user-toggle">
              <span className="user-toggle-text">Users</span>
              <div className="switch-container">
                <label>
                  <input ref="switch" className="switch" type="checkbox" />
                  <div>
                    <div />
                  </div>
                </label>
              </div>
              <span>Agents</span>
            </div>
            <select className="form-control filter-pages">
              <option value="all">All</option>
              <option value="email">Email</option>
              <option value="gmail">Gmail</option>
              <option value="fb">Facebook</option>
            </select>
          </div> */}
          <div className="users-search-container">
            <input
              className="form-control"
              onChange={e => this.updateSearch(e)}
            />
          </div>
        </div>

        <div
          className="container-fluid mobile-container"
          style={{ paddingTop: "14.5rem" }}
        >
          {this.state.queryArray.length >= 1 ? (
            <Table
              head={data.tHeadUsers}
              body={this.state.queryArray}
              method={this.passedFromChild}
            />
          ) : (
            <Table
              head={data.tHeadUsers}
              body={this.state.users}
              method={this.passedFromChild}
            />
          )}
        </div>
      </div>
    );
  }
}

export default index;
