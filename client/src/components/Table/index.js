import React, { Component } from "react";
import "./styles.css";
import { url } from "../../config/index";

class Row extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isButton: true,
      item: {}
    };
  }

  componentDidMount() {
    console.log("Arr received: ", this.props.x);
    let item = this.props.x;
    this.setState({ item });

    if (item.isButton) this.setState({ isButton: true });
  }

  render() {
    if (this.state.isButton && this.state.item.name)
      return (
        <td
          key={this.state.item.name}
          style={{ width: 10 }}
          className="table-data-mobile"
        >
          {this.state.item.name}
        </td>
      );
    else
      return (
        <div>
          <p>Not Button</p>
        </div>
      );
  }
}

class RenderButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      head: "",
      body: ""
    };
  }

  render() {
    return <div />;
  }
}

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

  approve = id => {
    fetch(`${url}/api/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        id
      })
    })
      .then(res => res.json())

      .then(data => {
        if (data.success === true) {
          console.log("Registration status: ", data.success);
          alert(data.message);

          if (data.success === true) {
            window.location.reload();
          }
        }
      })

      .catch(err => console.log(err));
  };

  renderRow = x => {
    return <Row x={x} />;

    // Object.values(x).map((y, i) => {
    //   return (
    //     <td
    //       key={i}
    //       style={{ width: this.props.head[i].width }}
    //       className="table-data-mobile"
    //     >
    //       {y}
    //     </td>
    //   );
    // });
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
                {/* {this.renderRow(x)} */}
                {Object.values(x).map((y, i) => {
                  return (
                    <td
                      key={i}
                      style={{ width: this.props.head[i].width }}
                      className="table-data-mobile"
                    >
                      {y}
                    </td>
                  );
                })}
                {this.state.isButton
                  ? <RenderButton />(
                      <td
                        style={{ width: this.props.head[i].width }}
                        className="table-data-mobile"
                      >
                        <button>Decline</button>
                      </td>
                    ) // <td
                  : //   style={{ width: this.props.head[i].width }}
                    //   className="table-data-mobile"
                    // >
                    //   <button>Approve</button>
                    // </td>
                    null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default index;
