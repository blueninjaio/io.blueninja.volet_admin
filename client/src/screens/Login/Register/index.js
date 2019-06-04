import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class index extends Component {

    register = () =>{
        this.props.history.push('/login')
    }

    back = () =>{
        this.props.history.push('/login')
    }


    render() {
        return (
            <div className="login-form-container">
              

                <h2 className="login-title">Register</h2>

                <input type="email" className="form-control login-input"  placeholder="Enter email"></input>
                <input type="password" className="form-control login-input"  placeholder="Enter password"></input>
                <input type="name" className="form-control login-input"  placeholder="Enter name"></input>
                <input type="username" className="form-control login-input"  placeholder="Enter username"></input>
                <input type="text" className="form-control login-input"  placeholder="Enter D.O.B"></input>
                
               
                <button className="login-btn" onClick={()=> this.register()}>
                    Register
                </button>
                <button className="login-btn" onClick={()=> this.back()}>
                    Back
                </button>
                 
                    <small id="emailHelp" className="form-text forgot-password-text go-register-text">Don't have an account? <NavLink to="/register">Sign in</NavLink></small>
                
            </div>
        )
    }
}
