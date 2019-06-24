import React, { Component } from "react";
import Card from "../../../components/Card";
import Table from "../../../components/Table";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      allUsers: [
        {
          name: "Sarah Rock",
          email: "test@gmail.com",
          phone: "+6012-3456789"
        }
      ],
      fbUsers: [
        {
          name: "Sarah Rock",
          fb: "test@fb.com",
          phone: "+6012-3456789"
        }
      ],
      gmailUsers: [
        {
          name: "Sarah Rock",
          gmail: "test@fb.com",
          phone: "+6012-3456789"
        }
      ],
      emailUsers: [
        {
          name: "Sarah Rock",
          email: "test@fb.com",
          phone: "+6012-3456789"
        }
      ],
      filterUsers: "all"
    };
  }

  //   viewUser = () => {
  //     this.props.history.push("/viewuser");
  //   };

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

        <div className="container-fluid" style={{ paddingTop: "13rem" }}>
          <Table />
        </div>
      </div>
    );
  }
}

export default index;
