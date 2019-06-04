import React, { Component } from 'react'
import {loginNow} from  '../../../actions/actions'
import {connect} from 'react-redux'

import {NavLink} from 'react-router-dom'

class index extends Component {

    login =  () => {
        this.props.loginNow()  
   }


    render() {
        return (
            <div className="login-form-container">
                {/* <p>Login</p>
                <button onClick={()=> this.login()}>Click me</button> */}

                <h2 className="login-title">Login</h2>

                <input type="email" className="form-control login-input"  placeholder="Enter email"></input>
                <input type="password" className="form-control login-input"  placeholder="Enter password"></input>

                <NavLink to="/forgotpassword">
                    <small id="emailHelp" className="form-text forgot-password-text">Forgot Password?</small>
                </NavLink>
                <button className="login-btn" onClick={()=> this.login()}> 
                    Login
                </button>

                 
                    <small id="emailHelp" className="form-text forgot-password-text go-register-text">Don't have an account? <NavLink to="/register">Sign up</NavLink></small>
                
            </div>
        )
    }
}



export default connect(null, {loginNow})(index)