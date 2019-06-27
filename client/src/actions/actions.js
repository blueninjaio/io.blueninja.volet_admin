import { LOGIN, GET_TOKEN, VERIFY_TOKEN } from "./actionTypes.js";
import { url } from "../config";
/**
|--------------------------------------------------
| Login dispatch which changes the login state to true 
|--------------------------------------------------
*/
export const loginNow = () => dispatch => {
  dispatch({
    type: LOGIN,
    payload: true
  });
};

/**
|--------------------------------------------------
| Logout dispatch which changes the login state to false
|--------------------------------------------------
*/

export const logoutNow = () => dispatch => {
  dispatch({
    type: LOGIN,
    payload: false
  });
};

export const getToken = (email, password) => dispatch => {
  fetch(`${url}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(res => res.json())

    .then(data => {
      if (data.success === true) {
        alert(data.message);
        let token = data.token;
        localStorage.setItem("user_token", token);

        dispatch({
          type: GET_TOKEN,
          payload: token
        });
      }
    })

    .catch(err => console.log(err));
};
