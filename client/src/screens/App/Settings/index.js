import React, { Component } from 'react'

export default class index extends Component {
    render() {
        return (
            <div className="dashboard-container">
                    <h3 className="page-title">Forgot Password</h3>
                    <div className="voucher-full-desc-container">
                            <input type="password" class="form-control settings-input" id="exampleInputPassword1" placeholder="Old Password"/>
                            <input type="password" class="form-control settings-input " id="exampleInputPassword1" placeholder="New Password"/>
                            <input type="password" class="form-control settings-input" id="exampleInputPassword1" placeholder="Confirm Password"/>
                    </div>
            </div>
        )
    }
}
