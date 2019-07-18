import React, { Component } from "react";
import "./styles.css";
import { url } from "../../config";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      w: "",
      bAccRow: false,
      columns: [],
      toggle: false,
      isActive: false
    };
  }
  componentDidMount() {
    console.log("Isactive", this.props.isActive);
    console.log("IDS", this.props.id);
  }

  onActionActivateToggle = (k, i) => {
    console.log("E: ", k.target.checked);
    console.log("Id: ", this.props.ids[i]);
    // this.setState({ isActive: !this.state.isActive });
    // console.log(this.state.isActive);
    // let ids = this.props.id;
    // let chosen = ids[i];

    // console.log("Toggle Activated", chosen);

    // fetch(`${url}/api/bank/toggle`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //     Accept: "application/json"
    //   },
    //   body: JSON.stringify({
    //     _id: chosen,
    //     isActive: this.state.isActive
    //   })
    // })
    //   .then(res => res.json())

    //   .then(data => {
    //     if (data.success === true) {
    //       alert(data.message);
    //     } else {
    //       alert(data.message);
    //     }
    //   })

    //   .catch(err => console.log(err));
  };

  onActionDeactivateToggle = i => {
    this.setState({ toggle: false });

    let ids = this.props.id;
    let chosen = ids[i];

    console.log("Toggle Activated", chosen);

    fetch(`${url}/api/bank/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        _id: chosen,
        isActive: false
      })
    })
      .then(res => res.json())

      .then(data => {
        if (data.success === true) {
          alert(data.message);
          window.location.reload();
        } else {
          alert(data.message);
        }
      })

      .catch(err => console.log(err));
  };

  /**
  |--------------------------------------------------
  | approve business requests and agent requests
  |--------------------------------------------------
  */
  approve = i => {
    if (this.props.model === "business") {
      let ids = this.props.id;
      let chosen = ids[i];

      console.log("Approved Chosen:", chosen);
      fetch(`${url}/api/business/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _id: chosen
        })
      })
        .then(res => res.json())

        .then(data => {
          if (data.success === true) {
            alert(data.message);
            window.location.reload();
          } else {
            alert(data.message);
          }
        })

        .catch(err => console.log(err));
    } else if (this.props.model === "agent") {
      let ids = this.props.id;
      let chosen = ids[i];

      console.log("Approved Chosen:", chosen);
      fetch(`${url}/api/agents/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user_id: chosen
        })
      })
        .then(res => res.json())

        .then(data => {
          if (data.success === true) {
            alert(data.message);
            window.location.reload();
          } else {
            alert(data.message);
          }
        })

        .catch(err => console.log(err));
    }
  };

  /**
  |--------------------------------------------------
  | decline business requests and agent requests
  |--------------------------------------------------
  */

  decline = i => {
    if (this.props.model === "business") {
      let ids = this.props.id;
      let chosen = ids[i];

      console.log("Approved Chosen:", chosen);
      fetch(`${url}/api/business/decline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _id: chosen
        })
      })
        .then(res => res.json())

        .then(data => {
          if (data.success === true) {
            alert(data.message);
            window.location.reload();
          } else {
            alert(data.message);
          }
        })

        .catch(err => console.log(err));
    } else if (this.props.model === "agent") {
      console.log("Hello");
      let ids = this.props.id;
      let chosen = ids[i];

      console.log("Approved Chosen:", chosen);
      fetch(`${url}/api/agents/decline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user_id: chosen
        })
      })
        .then(res => res.json())

        .then(data => {
          if (data.success === true) {
            alert(data.message);
            window.location.reload();
          } else {
            alert(data.message);
          }
        })

        .catch(err => console.log(err));
    }
  };

  onActionToggle = () => {};

  render() {
    return (
      <div>
        <table className="table fixed-table-head table-bordered">
          <thead>
            <tr
              style={{
                background: "rgb(248,248,248)",
                color: "rgb(204,204,204)"
              }}
            >
              {this.props.head.map(x => (
                <th
                  className="table-head-data-mobile"
                  key={x.id}
                  style={{ width: x.width, textAlign: "center", border: 0 }}
                >
                  {x.title}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <table
          className="table table-bordered user-table"
          style={{ fontSize: 14 }}
        >
          <tbody>
            {this.props.body.map((x, i) => (
              <tr
                onClick={() => this.props.method(i, true)}
                key={i}
                style={{
                  textAlign: "center",
                  border: 0
                }}
              >
                {Object.values(x).map((y, i) => (
                  <td
                    key={i}
                    style={{
                      width: this.props.head[i].width
                    }}
                    className="table-data-mobile"
                  >
                    {y}
                  </td>
                ))}
                {this.props.button
                  ? this.props.button.map((x, j) => (
                      <td
                        style={{ width: this.props.head[j].width }}
                        className="table-data-mobile"
                      >
                        {x.name === "Approve" ? (
                          <button
                            className="businessRequestApprove table-data-mobile"
                            onClick={() => this.approve(i)}
                          >
                            {x.name}
                          </button>
                        ) : (
                          <button
                            className="businessRequestDecline table-data-mobile"
                            onClick={() => this.decline(i)}
                          >
                            {x.name}
                          </button>
                        )}
                      </td>
                    ))
                  : null}
                {this.props.toggle
                  ? this.props.toggle.map((x, w) => (
                      <td
                        key={w}
                        style={{ width: this.props.head[w].width }}
                        className="table-data-mobile"
                      >
                        {this.props.isActive.map((x, z) =>
                          x ? (
                            <div className="user-toggle" key={z}>
                              <div className="switch-container">
                                <label>
                                  <input
                                    checked
                                    ref="switch"
                                    onChange={k =>
                                      this.onActionActivateToggle(k, i)
                                    }
                                    className="user"
                                    type="checkbox"
                                  />
                                  <div>
                                    <div />
                                  </div>
                                </label>
                              </div>
                            </div>
                          ) : (
                            <div className="user-toggle" key={z}>
                              <div className="switch-container">
                                <label>
                                  <input
                                    ref="switch"
                                    onChange={k =>
                                      this.onActionActivateToggle(k, i)
                                    }
                                    className="user"
                                    type="checkbox"
                                  />
                                  <div>
                                    <div />
                                  </div>
                                </label>
                              </div>
                            </div>
                          )
                        )
                        // <div className="user-toggle">
                        //   <div className="switch-container">
                        //     <label>
                        //       <input
                        //         ref="switch"
                        //         onClick={() =>
                        //           this.onActionDeactivateToggle(i)
                        //         }
                        //         className="user-agent"
                        //         type="checkbox"
                        //       />
                        //       <div>
                        //         <div />
                        //       </div>
                        //     </label>
                        //   </div>
                        // </div>
                        // ) : (
                        }
                      </td>
                    ))
                  : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default index;
