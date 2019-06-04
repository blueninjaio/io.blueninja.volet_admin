import { LOGIN, SETTINGS} from './actionTypes.js'


/**
|--------------------------------------------------
| Login dispatch which changes the login state to true 
|--------------------------------------------------
*/
export const loginNow = () => dispatch => {
    dispatch({
        type: LOGIN,
        payload: true
    })
}

/**
|--------------------------------------------------
| Logout dispatch which changes the login state to false
|--------------------------------------------------
*/

export const logoutNow = () => dispatch => {
    dispatch({
        type: LOGIN,
        payload: false
    })
}



