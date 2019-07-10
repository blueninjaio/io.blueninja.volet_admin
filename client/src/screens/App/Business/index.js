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
      business: [],
      businesData: [],
      selectedData: [],
      typeOfBusiness: [],
      tempArr: [],
      rowSelected: false,
      businessSelected: true,
      billingSelected: false,
      storeSelected: false,
      featuredItems: false,
      openingTimes: false,
      searchValue: "",
      selectOption: "",
      searchBusiness: "",
      queryArray: [],
      approved: [],
      approvedSelected: []
    };
  }

  /**
  |--------------------------------------------------
  | Upon page loading, fetches all the data from the api
  |--------------------------------------------------
  */
  componentDidMount() {
    this.fetchAllBusiness();
    this.fetchAllBusinessCat();
  }

  /**
  |--------------------------------------------------
  | receives and sets state 
    selected row data from the Table component
  |--------------------------------------------------
  */
  passedFromChild = (i, state) => {
    // console.log("approved array", this.state.approvedSelected[i]);

    this.setState({ rowSelected: state });
  };

  /**
  |--------------------------------------------------
  | fetches all busines categories
  |--------------------------------------------------
  */
  fetchAllBusinessCat = () => {
    fetch(`${url}/api/category`, {
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
          this.setState({ typeOfBusiness: data.categories });
        }
      })
      .catch(err => {
        alert(
          "Error connecting to server from fetching the businessCategory",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | fetches data from api
  |--------------------------------------------------
  */
  fetchAllBusiness = () => {
    fetch(`${url}/api/business`, {
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
          let approved = [];
          let approveReceived = [];

          data.businesses.map(x => {
            if (x.isApproved) {
              approved.push(x);
              this.setState({ approvedSelected: approved });
            }

            return approved;
          });

          approved.map(x => {
            let approve = {
              company_name: x.company_name,
              business_category: x.type_of_business,
              merchant_name: x.f_name + " " + x.l_name
            };
            approveReceived.push(approve);

            return approveReceived;
          });

          this.setState({ approved: approveReceived });
        }
      })
      .catch(err => {
        alert(
          "Error connecting to server from the business page, fetchAllBusiness",

          [{ text: "OK", onClick: () => null }],
          { cancelable: false }
        );
      });
  };

  /**
  |--------------------------------------------------
  | search function for merchant name
  |--------------------------------------------------
  */
  merchantSearch = async search => {
    let queryArray = this.state.business;
    let newArray = [];
    queryArray.map(x => {
      if (
        x.f_name.includes(search) ||
        x.l_name.includes(search) ||
        (x.f_name + " " + x.l_name).includes(search)
      ) {
        newArray.push(x);
      }

      return newArray;
    });

    this.setState({ queryArray: newArray });
  };

  /**
  |--------------------------------------------------
  | search function for business name
  |--------------------------------------------------
  */
  businessSearch = async search => {
    let queryArray = this.state.business;
    let newArray = [];
    queryArray.map(x => {
      if (x.company_name.includes(search)) {
        newArray.push(x);
      }
      return newArray;
    });

    this.setState({ queryArray: newArray });
  };

  /**
  |--------------------------------------------------
  | search function to filter whether it is merchant or business
  |--------------------------------------------------
  */
  updateSearch = async (search, option) => {
    if (option === "merchant") {
      this.merchantSearch(search, option);
    } else if (option === "business") {
      this.businessSearch(search, option);
    }
  };

  /**
  |--------------------------------------------------
  | resets the whole array and searched results
  |--------------------------------------------------
  */
  reset = () => {
    this.setState({ queryArray: [] });
  };

  /**
  |--------------------------------------------------
  | change business category and display on table
  |--------------------------------------------------
  */
  changeBusinessType = async e => {
    let search = e.target.value;

    let queryArray = this.state.business;

    let newArray = [];

    queryArray.map(x => {
      if (x.business_category.includes(search)) {
        newArray.push(x);
      }
      return newArray;
    });

    this.setState({ queryArray: newArray });
  };

  /**
  |--------------------------------------------------
  | changes state onToggle
  |--------------------------------------------------
  */
  toggle = async () => {
    await this.setState({ isChecked: !this.state.isChecked });
    if (!this.state.isChecked) {
    } else if (this.state.isChecked) {
      setTimeout(() => {
        this.props.history.push("/useragent");
      }, 400);
    }
  };

  render() {
    return (
      <div className="dashboard-container">
        {this.state.rowSelected === true ? (
          <div className="modal-opacity" />
        ) : null}
        <div className="dashboard-header">
          <h3 className="table-page-title">Business</h3>
          <div className="business-search-container">
            <div className="business-search-one">
              <input
                className="form-control"
                value={this.state.searchValue}
                onChange={e => this.setState({ searchValue: e.target.value })}
              />
              <select
                value={this.state.selectOption}
                className="browser-default custom-select business-select-1"
                onChange={e => this.setState({ selectOption: e.target.value })}
              >
                <option>Select</option>
                <option value="merchant">Merchant Name</option>
                <option value="business">Business Name</option>
              </select>
              <button
                className="btn search-business-btn"
                onClick={() =>
                  this.updateSearch(
                    this.state.searchValue,
                    this.state.selectOption
                  )
                }
              >
                Search
              </button>
            </div>
            <div className="business-search-two">
              <button
                className="reset-btn-business"
                onClick={() => this.reset()}
              >
                Reset
              </button>
              <select
                className="browser-default custom-select business-select-2"
                onChange={e => this.changeBusinessType(e)}
              >
                {this.state.typeOfBusiness.map((x, i) => (
                  <option value={x.title} key={i}>
                    {x.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="container-fluid" style={{ paddingTop: "13rem" }}>
          {this.state.queryArray.length >= 1 ? (
            <Table
              head={data.tHeadMerchantBusiness}
              body={this.state.queryArray}
              data={this.state.businessData}
              method={this.passedFromChild}
            />
          ) : (
            <Table
              head={data.tHeadMerchantBusiness}
              body={this.state.approved}
              data={this.state.businessData}
              method={this.passedFromChild}
            />
          )}
        </div>

        {this.state.rowSelected === true ? (
          <div>
            {this.state.approvedSelected.map((x, i) => (
              <div className="view-business-container" key={i}>
                <button
                  className="exit-btn-view-business"
                  onClick={() => this.setState({ rowSelected: false })}
                >
                  <img
                    alt="selected-user-x-icon"
                    src="https://img.pngio.com/index-of-v2-imgs-x-png-black-and-white-256_256.png"
                  />
                </button>
                <div className="business-profile-container">
                  <img
                    alt="selected-user-profile-icon"
                    src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQ3NjM5MzQyOTU5OTYxNDc2/lil_wayne_photo_by_ray_tamarra_getty_images_entertainment_getty_56680625.jpg"
                  />
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
                          billingSelected: false,
                          openingTimes: false,
                          storeSelected: false,
                          featuredItems: false
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
                          billingSelected: false,
                          openingTimes: false,
                          storeSelected: false,
                          featuredItems: false
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
                          billingSelected: true,
                          openingTimes: false,
                          storeSelected: false,
                          featuredItems: false
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
                          billingSelected: true,
                          openingTimes: false,
                          storeSelected: false,
                          featuredItems: false
                        })
                      }
                    >
                      Billing
                    </button>
                  )}
                  {this.state.storeSelected === false ? (
                    <button
                      onClick={() =>
                        this.setState({
                          businessSelected: false,
                          billingSelected: false,
                          openingTimes: false,
                          storeSelected: true,
                          featuredItems: false
                        })
                      }
                    >
                      Store
                    </button>
                  ) : (
                    <button
                      className="view-business-tab-active"
                      onClick={() =>
                        this.setState({
                          businessSelected: false,
                          billingSelected: false,
                          openingTimes: false,
                          storeSelected: true,
                          featuredItems: false
                        })
                      }
                    >
                      Store
                    </button>
                  )}
                  {this.state.featuredItems === false ? (
                    <button
                      onClick={() =>
                        this.setState({
                          businessSelected: false,
                          billingSelected: false,
                          openingTimes: false,
                          storeSelected: false,
                          featuredItems: true
                        })
                      }
                    >
                      Featured Items
                    </button>
                  ) : (
                    <button
                      className="view-business-tab-active"
                      onClick={() =>
                        this.setState({
                          businessSelected: false,
                          billingSelected: false,
                          openingTimes: false,
                          storeSelected: false,
                          featuredItems: true
                        })
                      }
                    >
                      Featured Items
                    </button>
                  )}
                  {this.state.openingTimes === false ? (
                    <button
                      onClick={() =>
                        this.setState({
                          businessSelected: false,
                          billingSelected: false,
                          openingTimes: true,
                          storeSelected: false,
                          featuredItems: false
                        })
                      }
                    >
                      Opening Times
                    </button>
                  ) : (
                    <button
                      className="view-business-tab-active"
                      onClick={() =>
                        this.setState({
                          businessSelected: false,
                          billingSelected: false,
                          openingTimes: true,
                          storeSelected: false,
                          featuredItems: false
                        })
                      }
                    >
                      Opening Times
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
                {this.state.storeSelected === true ? (
                  <div className="main-field-container">
                    <div className="field-container">
                      <span>Logo: </span>
                      <span className="email-span">Logo</span>
                    </div>
                    <div className="field-container">
                      <span>Name: </span>
                      <span className="email-span">James Padding </span>
                    </div>
                    <div className="field-container">
                      <span>No: </span>
                      <span className="email-span">123456 </span>
                    </div>
                    <div className="field-container">
                      <span>Description: </span>
                      <span className="email-span">Description</span>
                    </div>
                  </div>
                ) : null}

                {this.state.featuredItems === true ? (
                  <div className="main-field-container">
                    <div className="featured-item-field-container">
                      <div className="featured-item-img-container">
                        <img
                          alt="img"
                          src="https://vignette.wikia.nocookie.net/insatiablenetflix/images/3/37/36160115_486814051774091_6550841096618901504_n.jpg/revision/latest?cb=20180811150848"
                        />
                      </div>
                      <div className="featured-item-desc-container">
                        <span>Krusty Krab</span>
                        <p>Description</p>
                      </div>
                      <div className="featured-item-price-container">
                        <span>$10</span>
                      </div>
                    </div>
                    <div className="featured-item-field-container">
                      <div className="featured-item-img-container">
                        <img
                          alt="img"
                          src="https://vignette.wikia.nocookie.net/insatiablenetflix/images/3/37/36160115_486814051774091_6550841096618901504_n.jpg/revision/latest?cb=20180811150848"
                        />
                      </div>
                      <div className="featured-item-desc-container">
                        <span>Krusty Krab</span>
                        <p>Description</p>
                      </div>
                      <div className="featured-item-price-container">
                        <span>$10</span>
                      </div>
                    </div>
                    <div className="featured-item-field-container">
                      <div className="featured-item-img-container">
                        <img
                          alt="img"
                          src="https://vignette.wikia.nocookie.net/insatiablenetflix/images/3/37/36160115_486814051774091_6550841096618901504_n.jpg/revision/latest?cb=20180811150848"
                        />
                      </div>
                      <div className="featured-item-desc-container">
                        <span>Krusty Krab</span>
                        <p>Description</p>
                      </div>
                      <div className="featured-item-price-container">
                        <span>$10</span>
                      </div>
                    </div>
                  </div>
                ) : null}

                {this.state.openingTimes === true ? (
                  <div className="main-field-container">
                    <div className="field-container">
                      <span>Sun: </span>
                      <span className="email-span">Logo</span>
                    </div>
                    <div className="field-container">
                      <span>Sat: </span>
                      <span className="email-span">James Padding </span>
                    </div>
                    <div className="field-container">
                      <span>Fri: </span>
                      <span className="email-span">123456 </span>
                    </div>
                    <div className="field-container">
                      <span>Thurs: </span>
                      <span className="email-span">Description</span>
                    </div>
                    <div className="field-container">
                      <span>Wed: </span>
                      <span className="email-span">James Padding </span>
                    </div>
                    <div className="field-container">
                      <span>Tues: </span>
                      <span className="email-span">123456 </span>
                    </div>
                    <div className="field-container">
                      <span>Mon: </span>
                      <span className="email-span">Description</span>
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
