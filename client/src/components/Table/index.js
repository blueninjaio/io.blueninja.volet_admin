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
              {/* {this.props.head.map(x => (
                <th key={x.id} style={{ width: x.width }}>
                  {x.title}
                </th>
              ))} */}

              <th>Test</th>
              <th>Test</th>
              <th>Test</th>
              <th>Test</th>
            </tr>
          </thead>
        </table>
        <table className="table table-bordered user-table">
          <tbody>
            {/* {this.props.body.map(x => (
              <tr onClick={() => this.props.viewProfile(x)}>
                <td key={x.id} style={{ width: x.noWidth }}>
                  {x.no}
                </td>
                <td style={{ width: x.fnameWidth }}>{x.fname}</td>
                {!x.lname ? (
                  <td key={x.id} style={{ display: "none" }} />
                ) : (
                  <td style={{ width: x.lnameWidth }}>{x.lname}</td>
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
                )}
              </tr>
            ))} */}
            <tr>
              <td>Test</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Test</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Test</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Test</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Test</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Test</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>

            <tr>
              <td>Test</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Test</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Test</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>

            <tr>
              <td>Test</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>Test</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default index;
