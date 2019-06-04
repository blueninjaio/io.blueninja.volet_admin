import React, { Component } from 'react'
import Login from './Login/index'
import App from './App/index'
import {connect} from 'react-redux'

class index extends Component {
    render() {
        return (
        <div>
            {
                this.props.login === true
                ?
                     <App/>
                :
                     <Login/>
            }
        </div>
        )
    }
}



/**
|--------------------------------------------------
| calls the login state from the login reducer
|--------------------------------------------------
*/
const mapStateToProps = (state) => {
    return {
        login: state.login.isLoggedIn
    }
}


/**
|--------------------------------------------------
| connects the state and dispatch to the screen index
|--------------------------------------------------
*/

export default connect(mapStateToProps, null)(index)
