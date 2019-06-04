import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class index extends Component {

    
    render() {
        return (
            <div className="login-form-container">
                {/* <p>Login</p>
                <button onClick={()=> this.login()}>Click me</button> */}

                <h2 className="login-title">Forgot Password</h2>

                <input type="email" className="form-control login-input"  placeholder="Enter email"></input>
               

                <button className="login-btn"> 
                    Send me the email
                </button>
                <button className="login-btn" onClick={()=> this.props.history.push('/login')}> 
                    Back
                </button>
                 
                    <small id="emailHelp" className="form-text forgot-password-text go-register-text">Don't have an account? <NavLink to="/register">Sign up</NavLink></small>
                
            </div>
        )
    }
}
