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
      businesData: [],
      selectedData: [],
      rowSelected: false,
      businessSelected: true,
      billingSelected: false
    };
  }

  componentDidMount() {
    this.fetchAllBusiness();
  }

  passedFromChild = (i, state) => {
    let arr = this.state.selectedData;
    console.log("Passed:", this.state.businessData[i]);

    arr.push(this.state.businessData[i]);
    this.setState({ rowSelected: state });
    console.log("Details saved", this.state.selectedData);
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
        if (data.success) {
          let business = [];
          console.log("Business: ", data.businesses);
          data.businesses.map(x => {
            let merchant = {
              f_name: x.f_name,
              l_name: x.l_name,
              business_category: x.business_category,
              company_name: x.company_name
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
        {this.state.rowSelected === true ? (
          <div className="modal-opacity" />
        ) : null}
        <div className="dashboard-header">
          <h3 className="table-page-title">Business</h3>
        </div>

        <div className="container-fluid" style={{ paddingTop: "13rem" }}>
          <Table
            head={data.tHeadMerchantBusiness}
            body={this.state.business}
            data={this.state.businessData}
            method={this.passedFromChild}
          />
        </div>

        {this.state.rowSelected === true ? (
          <div>
            {this.state.selectedData.map((x, i) => (
              <div className="view-business-container" key={i}>
                <button
                  className="exit-btn-view-business"
                  onClick={() => this.setState({ rowSelected: false })}
                >
                  <img src="https://img.pngio.com/index-of-v2-imgs-x-png-black-and-white-256_256.png" />
                </button>
                <div className="business-profile-container">
                  <img src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQ3NjM5MzQyOTU5OTYxNDc2/lil_wayne_photo_by_ray_tamarra_getty_images_entertainment_getty_56680625.jpg" />
                  <span>
                    {x.f_name} {x.l_name}
                  </span>
                </div>
                <div className="business-email-container">
                  <span>Email: </span>
                  <span className="email-span">{x.email} </span>
                </div>
                <div className="business-email-container">
                  <span>Identification: </span>
                  <span className="email-span">{x.identification} </span>
                </div>
                <div className="business-email-container">
                  <span>Contact: </span>
                  <span className="email-span">{x.contact} </span>
                </div>
                <div className="business-email-container">
                  <span>Legal Name: </span>
                  <span className="email-span">{x.legal_name} </span>
                </div>
                <div className="border-view-business" />
                <div className="view-business-tabs">
                  {this.state.businessSelected === false ? (
                    <button
                      onClick={() =>
                        this.setState({
                          businessSelected: true,
                          billingSelected: false
                        })
                      }
                    >
                      Business
                    </button>
                  ) : (
                    <button
                      className="view-business-tab-active"
                      onClick={() =>
                        this.setState({
                          businessSelected: true,
                          billingSelected: false
                        })
                      }
                    >
                      Business
                    </button>
                  )}

                  {this.state.billingSelected === false ? (
                    <button
                      onClick={() =>
                        this.setState({
                          businessSelected: false,
                          billingSelected: true
                        })
                      }
                    >
                      Billing
                    </button>
                  ) : (
                    <button
                      className="view-business-tab-active"
                      onClick={() =>
                        this.setState({
                          businessSelected: false,
                          billingSelected: true
                        })
                      }
                    >
                      Billing
                    </button>
                  )}
                </div>

                {this.state.businessSelected === true ? (
                  <div className="main-field-container">
                    <div className="field-container">
                      <span>Company name: </span>
                      <span className="email-span">{x.company_name}</span>
                    </div>
                    <div className="field-container">
                      <span>Branding: </span>
                      <span className="email-span">{x.branding} </span>
                    </div>
                    <div className="field-container">
                      <span>Type of business: </span>
                      <span className="email-span">{x.type_of_business} </span>
                    </div>
                    <div className="field-container">
                      <span>Business Category: </span>
                      <span className="email-span">{x.business_category} </span>
                    </div>
                    <div className="field-container">
                      <span>Business Email: </span>
                      <span className="email-span">{x.business_email} </span>
                    </div>
                    <div className="field-container">
                      <span>Business contact: </span>
                      <span className="email-span">{x.business_contact} </span>
                    </div>
                    <div className="field-container">
                      <span>Business Number: </span>
                      <span className="email-span">{x.business_number} </span>
                    </div>
                    <div className="field-container">
                      <span>Branch: </span>
                      <span className="email-span">{x.branch} </span>
                    </div>
                    <div className="field-container">
                      <span>Account Number: </span>
                      <span className="email-span">{x.account_number} </span>
                    </div>
                  </div>
                ) : null}
                {this.state.billingSelected === true ? (
                  <div className="main-field-container">
                    <div className="field-container">
                      <span>Tax number: </span>
                      <span className="email-span">{x.tax_number} </span>
                    </div>
                    <div className="field-container">
                      <span>Payment method: </span>
                      <span className="email-span">{x.payment_method} </span>
                    </div>
                    <div className="field-container">
                      <span>Bank: </span>
                      <span className="email-span">{x.bank} </span>
                    </div>
                    <div className="field-container">
                      <span>Currency: </span>
                      <span className="email-span">{x.currency} </span>
                    </div>
                    <div className="field-container">
                      <span>Billing address: </span>
                      <span className="email-span">{x.billing_address} </span>
                    </div>
                    <div className="field-container">
                      <span>Postcode: </span>
                      <span className="email-span">{x.postcode} </span>
                    </div>
                    <div className="field-container">
                      <span>State: </span>
                      <span className="email-span">{x.state} </span>
                    </div>
                    <div className="field-container">
                      <span>Country: </span>
                      <span className="email-span">{x.country} </span>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default index;
