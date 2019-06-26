//
import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
import { url } from "../../../config";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      filterUsers: "all",
      merchants: [],
      sendState: false,
      sendData: null
    };
  }

  /**
  |--------------------------------------------------
  | receives and sets state 
    selected row data from the Table component
  |--------------------------------------------------
  */
  passedFromChild = (i, state) => {
    let arr = this.state.sendData;
    let send = this.state.sendState;

    this.setState({ sendData: arr });
    this.setState({ sendState: send });
  };

  /**
  |--------------------------------------------------
  | On page load, fetch from api
  |--------------------------------------------------
  */
  componentDidMount() {
    this.fetchAllMerchants();
  }

  /**
  |--------------------------------------------------
  | Fetches data from Api and stores in an array
  |--------------------------------------------------
  */
  fetchAllMerchants = () => {
    fetch(`${url}/api/merchants`, {
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
          let merchants = [];
          data.merchants.map(x => {
            let merchant = {
              f_name: x.f_name,
              l_name: x.l_name,
              email: x.email,
              contact: x.contact,
              dateCreated: x.dateCreated
            };
            merchants.push(merchant);
          });
          console.log("Final Merchants: ", merchants);
          this.setState({ merchants });
        }
      })
      .catch(err => {
        console.log("Error for merchants page", err);

        alert(
          "Error connecting to server",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | changes state on toggle
  |--------------------------------------------------
  */
  toggle = async () => {
    await this.setState({ isChecked: !this.state.isChecked });
    console.log(this.state.isChecked);
    if (!this.state.isChecked) {
      console.log("Users Page");
    } else if (this.state.isChecked) {
      setTimeout(() => {
        this.props.history.push("/useragent");
      }, 400);
    }
  };

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h3 className="table-page-title">Merchants</h3>
        </div>

        <div className="container-fluid" style={{ paddingTop: "13rem" }}>
          <Table
            head={data.tHeadBusiness}
            body={this.state.merchants}
            method={this.passedFromChild}
          />
        </div>
      </div>
    );
  }
}

export default index;
