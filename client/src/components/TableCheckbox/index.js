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

  onActionToggle = (id, i, e) => {
    let toggleStatus = e.target.checked;
    console.log("Receiving ID: ", id._id);
    console.log("Row: ", i);
    console.log("Status: ", e.target.checked);
    console.log(this.props.toggle);

    if (this.props.toggle === "banks") {
      fetch(`${url}/api/bank/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _id: id._id,
          isActive: toggleStatus
        })
      })
        .then(res => res.json())

        .then(data => {
          console.log(data);
          if (data.success === true) {
            alert(data.message);
          } else {
            alert(data.message);
          }
        })

        .catch(err => console.log(err));
    } else if (this.props.toggle === "businessCategory") {
      fetch(`${url}/api/business_category/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _id: id._id,
          isActive: e.target.checked
        })
      })
        .then(res => res.json())

        .then(data => {
          console.log(data);
          // if (data.success === true) {
          //   alert(data.message);
          // } else {
          //   alert(data.message);
          // }
        })

        .catch(err => console.log(err));
    } else if (this.props.toggle === "paymentMethods") {
      fetch(`${url}/api/payment_method/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _id: id._id,
          isActive: e.target.checked
        })
      })
        .then(res => res.json())

        .then(data => {
          console.log(data);
          if (data.success === true) {
            alert(data.message);
          } else {
            alert(data.message);
          }
        })

        .catch(err => console.log(err));
    } else if (this.props.toggle === "businessTypes") {
      fetch(`${url}/api/business_type/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _id: id._id,
          isActive: e.target.checked
        })
      })
        .then(res => res.json())

        .then(data => {
          console.log(data);
          if (data.success === true) {
            alert(data.message);
          } else {
            alert(data.message);
          }
        })

        .catch(err => console.log(err));
    } else if (this.props.toggle === "currency") {
      fetch(`${url}/api/currency/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _id: id._id,
          isActive: e.target.checked
        })
      })
        .then(res => res.json())

        .then(data => {
          console.log(data);
          if (data.success === true) {
            alert(data.message);
          } else {
            alert(data.message);
          }
        })

        .catch(err => console.log(err));
    }
  };

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
                // onClick={() => this.props.method(i, true)}
                key={i}
                style={{
                  textAlign: "center",
                  border: 0
                }}
              >
                <td style={{ width: "25%" }} className="table-data-mobile">
                  {i}
                </td>
                <td style={{ width: "25%" }} className="table-data-mobile">
                  {x.name}
                </td>
                <td style={{ width: "25%" }} className="table-data-mobile">
                  {x.description}
                </td>
                <td style={{ width: "25%" }} className="table-data-mobile">
                  {x.isActive === true ? (
                    <div className="user-toggle">
                      <div className="switch-container">
                        <label>
                          <input
                            checked
                            ref="switch"
                            onChange={e => this.onActionToggle(x, i, e)}
                            className="user-agent"
                            type="checkbox"
                          />
                          <div>
                            <div />
                          </div>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="user-toggle">
                      <div className="switch-container">
                        <label>
                          <input
                            ref="switch"
                            onChange={e => this.onActionToggle(x, i, e)}
                            className="user"
                            type="checkbox"
                          />
                          <div>
                            <div />
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default index;
