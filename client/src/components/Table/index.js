import React, { Component } from "react";
import "./styles.css";
import { url } from "../../config";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      w: "",
      bAccRow: false,
      columns: []
    };
  }

  /**
  |--------------------------------------------------
  | approve business requests 
  |--------------------------------------------------
  */
  approveBusiness = i => {
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
          window.location.reload();
        } else {
          alert(data.message);
        }
      })

      .catch(err => console.log(err));
  };

  /**
  |--------------------------------------------------
  | decline business requests 
  |--------------------------------------------------
  */

  declineBusiness = i => {
    let ids = this.props.id;
    let chosen = ids[i];

    console.log("Declined Chosen:", chosen);
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
          window.location.reload();
        } else {
          alert(data.message);
        }
      })

      .catch(err => console.log(err));
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
                            onClick={() => this.approveBusiness(i)}
                          >
                            {x.name}
                          </button>
                        ) : (
                          <button
                            className="businessRequestDecline table-data-mobile"
                            onClick={() => this.declineBusiness(i)}
                          >
                            {x.name}
                          </button>
                        )}
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
