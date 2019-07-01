import React, { Component } from "react";
import "./styles.css";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      w: "",
      bAccRow: false,
      columns: []
    };
  }

  componentDidMount() {
    console.log("Body:", this.props.body);
  }

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
                    style={{ width: this.props.head[i].width }}
                    className="table-data-mobile"
                  >
                    {y}
                  </td>
                ))}
                {this.props.button
                  ? this.props.button.map((x, i) => (
                      <td
                        style={{ width: this.props.head[i].width }}
                        className="table-data-mobile"
                      >
                        {x.name === "Approve" ? (
                          <button className="businessRequestApprove table-data-mobile">
                            {x.name}
                          </button>
                        ) : (
                          <button className="businessRequestDecline table-data-mobile">
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
