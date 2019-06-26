import React, { Component } from "react";
import "./styles.css";

export default class index extends Component {
  render() {
    return (
      <div className="profile-card-container">
        <div className="profile-card">
          <div className="card-header">
            <strong>User</strong>
          </div>
          <div className="card-body">
            <div className="card-body-content">
              <img
                alt="first-card-img"
                src="https://www.historicacanada.ca/sites/default/files/staff_davida_detail_0.png"
              />
              <span>Sarah Rock</span>
              <span>
                <img
                  alt="special-email-icons"
                  src="http://www.stickpng.com/assets/images/584856bce0bb315b0f7675ad.png"
                  className="email-icon"
                />
                test@gmail.com
              </span>
              <span>+6012-3456789</span>
              <span>Volet Credits: 100</span>
              <span>Registered on: 19th June 2019</span>
            </div>
          </div>
          <div className="card-footer">
            <button
              className="profile-view-btn"
              onClick={() => this.viewUser()}
            >
              View
            </button>
            <button className="profile-delete-btn">Delete</button>
          </div>
        </div>
        <div className="profile-card">
          <div className="card-header">
            <strong>User</strong>
          </div>
          <div className="card-body">
            <div className="card-body-content">
              <img
                alt="second-card-img"
                src="https://www.historicacanada.ca/sites/default/files/staff_davida_detail_0.png"
              />
              <span>Sarah Rock</span>
              <span>
                <img
                  alt="card-email-icon-img"
                  src="https://img.icons8.com/color/420/gmail.png"
                  className="email-icon"
                />
                test@gmail.com
              </span>
              <span>+6012-3456789</span>
              <span>Volet Credits: 100</span>
              <span>Registered on: 19th June 2019</span>
            </div>
          </div>
          <div className="card-footer">
            <button
              className="profile-view-btn"
              onClick={() => this.viewUser()}
            >
              View
            </button>
            <button className="profile-delete-btn">Delete</button>
          </div>
        </div>
        <div className="profile-card">
          <div className="card-header">
            <strong>User</strong>
          </div>
          <div className="card-body">
            <div className="card-body-content">
              <img
                alt="third-card-img"
                src="https://www.historicacanada.ca/sites/default/files/staff_davida_detail_0.png"
              />
              <span>Sarah Rock</span>
              <span>
                <img
                  alt="second-card-email-icons"
                  src="https://png.pngtree.com/svg/20170602/96bf30659c.png"
                  className="email-icon"
                />
                test@gmail.com
              </span>
              <span>+6012-3456789</span>
              <span>Volet Credits: 100</span>
              <span>Registered on: 19th June 2019</span>
            </div>
          </div>
          <div className="card-footer">
            <button className="profile-view-btn">View</button>
            <button className="profile-delete-btn">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}
