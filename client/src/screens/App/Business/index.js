//
import React, { Component } from "react";
import Card from "../../../components/Card";
import Table from "../../../components/Table";
import data from "../../../data/data.json";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      filterUsers: "all",
      business: [],
      businesData: []
    };
  }

  componentDidMount() {
    this.fetchAllBusiness();
  }

  passedFromChild = i => {
    console.log("Passed:", this.state.businessData[i]);
  };

  fetchAllBusiness = () => {
    fetch("http://165.22.245.137/api/business", {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"

        // 'Authorization': 'Bearer '+ token,
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data, "hello here")
        if (data.success) {
          //   this.setState({ users: data.merchants });
          //   console.log("Business: ", data.merchants);

          let business = [];
          console.log("Business: ", data.businesses);
          data.businesses.map(x => {
            let merchant = {
              f_name: x.f_name,
              l_name: x.l_name,
              email: x.email,
              contact: x.contact,
              dateCreated: x.dateCreated
            };
            business.push(merchant);
          });
          console.log("Final Merchants: ", business);
          this.setState({ business, businessData: data.businesses });
        }
      })
      .catch(err => console.log(err));
  };

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

  //   filterPage = async event => {
  //     await this.setState({ filterUsers: event.target.value });
  //     console.log(this.state.filterUsers);
  //   };

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h3 className="table-page-title">Business</h3>
        </div>

        <div className="container-fluid" style={{ paddingTop: "13rem" }}>
          <Table
            head={data.tHeadBusiness}
            body={this.state.business}
            data={this.state.businessData}
            link={"/busines/profile"}
            method={this.passedFromChild}
          />
        </div>

        {/* <div className="container-fluid">
          <div className="view-business-container">

          </div>
        </div> */}
      </div>
    );
  }
}

export default index;
