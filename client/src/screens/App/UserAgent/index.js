import React, { Component } from "react";
import Card from "../../../components/Card";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      filterUsers: "all"
    };
  }

  viewAgent = () => {
    this.props.history.push("/viewagent");
  };

  toggle = async () => {
    await this.setState({ isChecked: !this.state.isChecked });
    console.log(this.state.isChecked);
    if (!this.state.isChecked) {
      console.log("Users Page");
    } else if (this.state.isChecked) {
      this.props.history.push("/users");
    }
  };

  filterPage = async event => {
    await this.setState({ filterUsers: event.target.value });
    console.log(this.state.filterUsers);
  };

  render() {
    return (
      <div className="main-dashboard-container">
        <h3 className="page-title">User Agents</h3>
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
        <div className="user-toggle">
          <span className="user-toggle-text">Users</span>
          <div className="switch-container">
            <label>
              <input
                ref="switch"
                onClick={() => this.toggle()}
                className="user-agent"
                type="checkbox"
              />
              <div>
                <div />
              </div>
            </label>
          </div>
          <span>Agents</span>
        </div>

        <div className="container-fluid">
          <Card />
        </div>
      </div>
    );
  }
}

export default index;
