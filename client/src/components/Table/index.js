import React, { Component } from "react";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      w: "",
      bAccRow: false
    };
  }

  render() {
    return (
      <div>
        <table className="table fixed-table-head table-bordered">
          <thead>
            <tr>
              {this.props.head.map(x => (
                <th key={x.id} style={{ width: x.width }}>
                  {x.title}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <table className="table table-bordered user-table">
          <tbody>
            {this.props.body.map(x => (
              <tr>
                <td key={x.id} style={{ width: this.props.head[0].width }}>
                  {x.firstName}
                </td>
                <td style={{ width: this.props.head[1].width }}>
                  {x.lastName}
                </td>
                <td style={{ width: this.props.head[2].width }}>{x.email}</td>
                <td style={{ width: this.props.head[3].width }}>{x.contact}</td>
                <td style={{ width: this.props.head[4].width }}>
                  {x.facebookID}
                </td>
                <td style={{ width: this.props.head[5].width }}>
                  {x.googleID}
                </td>
                <td style={{ width: this.props.head[6].width }}>{x.credits}</td>
                <td style={{ width: this.props.head[7].width }}>
                  {x.timestamp}
                </td>
                {/* {!x.email ? (
                  <td key={x.id} style={{ display: "none" }} />
                ) : (
                  <td >{x.email}</td>
                )}
                {!x.username ? (
                  <td key={x.id} style={{ display: "none" }} />
                ) : (
                  <td style={{ width: x.usernameWidth }}>{x.username}</td>
                )}
                {!x.date ? (
                  <td key={x.id} style={{ display: "none" }} />
                ) : (
                  <td>{x.date}</td>
                )} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default index;
