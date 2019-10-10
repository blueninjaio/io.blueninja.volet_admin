import React, { Component } from "react";
import Table from "../../../components/Table";
import data from "../../../data/data.json";
import api from "../../../api/index";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      filterUsers: "all",
      merchants: [],
      sendState: false,
      sendData: null,
      rowSelected: false,
      businessSelected: true,
      billingSelected: false,
      openingTimes: false,
      storeSelected: false,
      featuredItems: false,
      approvedSelected: [],
      approved: []
    };
  }

  /**
  |--------------------------------------------------
  | receives and sets state 
    selected row data from the Table component
  |--------------------------------------------------
  */
  passedFromChild = (i, state) => {
    let arr = this.state.approved;

    arr.push(this.state.approvedSelected[i]);

    this.setState({ rowSelected: state });
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
    api
      .getMerchants()
      .then(data => {
        if (data.success) {
          this.setState({ approvedSelected: data.merchants });
          let merchants = [];
          data.merchants.map((x, i) => {
            let merchant = {
              no: i,
              f_name: x.f_name,
              l_name: x.l_name,
              email: x.email,
              contact: x.contact,
              dateCreated: x.dateCreated
            };
            merchants.push(merchant);
            return merchants;
          });

          this.setState({ merchants });
        }
      })
      .catch(err => {
        console.log("Error for merchants page", err);

        alert(
          "Error connecting to server, fetching all the merchants from the merchants page",

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
        {this.state.rowSelected === true ? (
          <div
            className="modal-opacity"
            onClick={() => this.setState({ rowSelected: false })}
          />
        ) : null}
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

        {this.state.rowSelected === true ? (
          <div>
            {this.state.approved.map((x, i) => (
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
                </div>

                {this.state.businessSelected === true ? (
                  <div className="main-field-container">
                    <ul>
                      <li>hello</li>
                    </ul>
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
