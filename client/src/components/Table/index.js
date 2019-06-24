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
            <tr
              style={{
                background: "rgb(248,248,248)",
                color: "rgb(204,204,204)"
              }}
            >
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
            {this.props.body.map((x, i) => (
              <tr>
                <td key={x.id} style={{ width: this.props.head[i].width }}>
                  {x.f_name}
                </td>
                <td style={{ width: this.props.head[i].width }}>{x.l_name}</td>
                <td style={{ width: this.props.head[i].width }}>{x.email}</td>
                <td style={{ width: this.props.head[i].width }}>{x.contact}</td>
                <td style={{ width: this.props.head[i].width }}>
                  {x.facebook_id}
                </td>
                <td style={{ width: this.props.head[i].width }}>
                  {x.google_id}
                </td>
                <td style={{ width: this.props.head[i].width }}>{x.credits}</td>
                <td style={{ width: this.props.head[i].width }}>
                  {x.dateCreated}
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
