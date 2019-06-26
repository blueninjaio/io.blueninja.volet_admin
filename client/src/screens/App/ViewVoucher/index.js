import React, { Component } from "react";

/**
|--------------------------------------------------
| renders view voucher page
|--------------------------------------------------
*/
export default class index extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <div className="container-fluid">
          <div className="voucher-banner-container">
            <img
              alt="voucher-page-banner"
              src="https://i.kinja-img.com/gawker-media/image/upload/s--vHt6tbFa--/c_scale,f_auto,fl_progressive,q_80,w_800/xjmx1csashjww8j8jwyh.jpg"
            />
          </div>
          <div className="voucher-full-desc-container">
            <span>Title: Hello</span>
            <span>Desc: Hello</span>
            <span>Quantity: Hello</span>
            <span>Validity: Hello</span>
          </div>
          <div className="voucher-full-desc-container">
            <span>List Of Users</span>
            <table class="table table-bordered">
              <thead class=" linear-background">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
