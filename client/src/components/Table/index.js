import React, { Component } from "react";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      w: "",
      bAccRow: false,
      columns: []
    };
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
                onClick={() => this.props.method(i)}
                key={x.id}
                style={{
                  textAlign: "center",
                  border: 0
                }}
              >
                {Object.values(x).map((y, i) => (
                  <td key={i} style={{ width: this.props.head[i].width }}>
                    {y}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default index;
