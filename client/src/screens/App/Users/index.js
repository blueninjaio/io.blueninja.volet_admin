import React, { Component } from "react";
import Card from "../../../components/Card";
import Table from "../../../components/Table";
import data from "../../../data/data.json";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      filterUsers: "all",
      users: []
    };
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  //   viewUser = () => {
  //     this.props.history.push("/viewuser");
  //   };

  fetchAllUsers = () => {
    fetch("http://165.22.245.137/api/users", {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"

        // 'Authorization': 'Bearer '+ token,
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data, "hello here")
        if (data.success) {
          // this.setState({ users: data.users });
          // console.log("Users: ", data.users);

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
      .catch(err => console.log(err));
  };

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

  //   filterPage = async event => {
  //     await this.setState({ filterUsers: event.target.value });
  //     console.log(this.state.filterUsers);
  //   };

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h3 className="table-page-title">Users</h3>
          <div className="filter-users-container">
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
            <select
              className="form-control filter-pages"
              value={this.state.filterUsers}
              onChange={this.filterPage}
            >
              <option value="all">All</option>
              <option value="email">Email</option>
              <option value="gmail">Gmail</option>
              <option value="fb">Facebook</option>
            </select>
          </div>
        </div>

        <div className="container-fluid" style={{ paddingTop: "14.5rem" }}>
          <Table head={data.tHeadUsers} body={this.state.users} />
        </div>
      </div>
    );
  }
}

export default index;
