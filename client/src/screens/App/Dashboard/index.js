import React, { Component } from "react";
import { VictoryPie, VictoryChart, VictoryTheme, VictoryBar } from "victory";
import { url } from "../../../config";

/**
|--------------------------------------------------
| renders the Dashboard page
|--------------------------------------------------
*/
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      business: [],
      businesData: [],
      stats: [],
      users: [],
      feedback: [],
      pending: [],
      pendingbusiness: []
    };
  }

  /**
  |--------------------------------------------------
  | run all the functions below on page load
  |--------------------------------------------------
  */
  componentDidMount() {
    this.fetchAllBusiness();
    this.fetchAllUsers();
    this.fetchAllFeedback();
    this.fetchAgents();
    this.fetchBusinessRequest();
  }

  /**
  |--------------------------------------------------
  | fetches all the pending agent requests from the api
  |--------------------------------------------------
  */
  fetchAgents = async () => {
    fetch(`${url}/api/agents`, {
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
          if (data.agent.length >= 1) {
            let business = data.agent;
            let pending = [];
            business.map(x =>
              x.isPending ? pending.push(x) : null
            );
            this.setState({ pending });
          }
        }
      })
      .catch(err => {
        alert(
          "Error connecting to server",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | fetches all the pending business request from the api
  |--------------------------------------------------
  */
  fetchBusinessRequest = async () => {
    fetch(`${url}/api/business`, {
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
          if(data.businesses){
            if (data.businesses.length >= 1) {
              let business = data.businesses;
              let pendingbusiness = [];
              business.map(x =>
                x.isPending ? pendingbusiness.push(x) : null
              );
  
              this.setState({ pendingbusiness });
            }
          }
        }
      })
      .catch(err => {
        alert(
          "Error connecting to server",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | fetches the most recent feedback from the api
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
          if (data.feedbacks.length >= 1) {
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
        }
      })
      .catch(err => {
        alert(
          "Error connecting to server",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | fetches all the business types from the api
  |--------------------------------------------------
  */
  fetchAllBusiness = () => {
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
          if (data.categories.length >= 1) {
            let business = [];
            let stats = [];

            data.categories.map(x => {
              let statistics = {
                x: x.title,
                y: 10
              };

              stats.push(statistics);
              this.setState({ stats });
              return stats
            });

            this.setState({ business, businessData: data.businesses });
          }
        }
      })
      .catch(err => {
        alert(
          "Error connecting to server",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | fetches all the users from the api
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
          if (data.users.length >= 1) {
            let users = [];
            data.users.map(x => {
              let user = {
                x: x.user_type,
                y: data.users.length
              };
              users.push(user);
              return users
            });

            this.setState({ users });
          }
        }
      })
      .catch(err => {
        alert(
          "Error connecting to server",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  render() {
    return (
      <div className="main-dashboard-container">
        <h3 className="page-title">Dashboard</h3>
        <div className="container-fluid">
          <div className="graph">
            <div className="graph-container">
              <p>Business Types</p>
              <VictoryChart
                theme={VictoryTheme.material}
                padding={{ left: 122, bottom: 122 }}
                width={670}
                height={300}
                domainPadding={100}
                style={{
                  parent: {
                    padding: 20,
                    height: 300
                  }
                }}
              >
                <VictoryBar
                  horizontal
                  cornerRadius={7}
                  data={this.state.stats}
                  style={{
                    data: {
                      fill: ({ y }) =>
                        y > 18 ? "rgb(95,153,252)" : "rgb(12,96,250)"
                    }
                  }}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 2000 }
                  }}
                />
              </VictoryChart>
            </div>
            <div className="graph-container">
              <p>User Vs User Agents</p>
              {/* <VictoryChart
                theme={VictoryTheme.material}
                width={700}
                height={300}
              >
                <VictoryBar
                  cornerRadius={10}
                  data={this.state.users}
                  style={{
                    label: {
                      fontSize: 16
                    },
                    data: {
                      fill: ({ y }) =>
                        y > 18 ? "rgb(95,153,252)" : "rgb(12,96,250)"
                    }
                  }}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 2000 }
                  }}
                />
              </VictoryChart> */}
              <VictoryPie
                innerRadius={200}
                width={1000}
                data={[{ x: 11, y: 35 }, { x: 11, y: 40 }]}
                style={{
                  data: {
                    fill: ({ y }) =>
                      y > 39 ? "rgb(95,153,252)" : "rgb(12,96,250)"
                  }
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 2000 }
                }}
              />
            </div>
            {/* <div className="graph-container">
              <p>Graph</p>
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                  style={{
                    data: { stroke: "rgb(12,96,250)" },
                    parent: { border: "1px solid #ccc" }
                  }}
                  data={[
                    { x: 1, y: 2 },
                    { x: 2, y: 3 },
                    { x: 3, y: 5 },
                    { x: 4, y: 4 },
                    { x: 5, y: 7 }
                  ]}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 2000 }
                  }}
                />
              </VictoryChart>
            </div> */}
            {/* <div className="graph-container">
              <p>Graph</p>
              <VictoryPie
                innerRadius={200}
                data={[{ x: 11, y: 35 }, { x: 11, y: 40 }]}
                style={{
                  data: {
                    fill: ({ y }) =>
                      y > 39 ? "rgb(95,153,252)" : "rgb(12,96,250)"
                  }
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 2000 }
                }}
              />
            </div> */}
          </div>
          <div className="graph">
            <div className="graph-container-2">
              <p>Most Recent Feedback </p>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.feedback.map((x, i) => (
                    <tr
                      key={i}
                      onClick={() => this.props.history.push("/feedback")}
                    >
                      <td>{x._id}</td>
                      <td>{x.rating}</td>
                      <td>{x.description}</td>
                      <td>{x.dateCreated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="graph">
            <div className="graph-container-2">
              <p>Pending Agent Requests </p>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Status</th>
                    <th scope="col">Approved</th>
                    <th scope="col">Declined</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.pending.map((x, i) => (
                    <tr
                      key={i}
                      onClick={() => this.props.history.push("/agentrequests")}
                    >
                      <td>{x._id}</td>
                      <td>{x.dateCreated}</td>
                      <td>{x.idPending ? "is Pending" : null}</td>
                      <td>{x.isApproved ? <button>Approve</button> : null}</td>
                      <td>{x.isDeclined ? <button>Decline</button> : null}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="graph">
            <div className="graph-container-2">
              <p>Pending Business Requests </p>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Status</th>
                    <th scope="col">Approved</th>
                    <th scope="col">Declined</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.pendingbusiness.map((x, i) => (
                    <tr
                      key={i}
                      onClick={() =>
                        this.props.history.push("/businessrequest")
                      }
                    >
                      <td>{x._id}</td>
                      <td>{x.dateCreated}</td>
                      <td>{x.idPending ? "is Pending" : null}</td>
                      <td>{x.isApproved ? <button>Approve</button> : null}</td>
                      <td>{x.isDeclined ? <button>Decline</button> : null}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
