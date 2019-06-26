import { LOGIN, LOGOUT } from "../actions/actionTypes";
/**
|--------------------------------------------------
| Initial State of login and logout
|--------------------------------------------------
*/
export const loginState = {
  isLoggedIn: false,
  isLoggedOut: true
};

/**
|--------------------------------------------------
| Action cases to listen to which is login and logout
|--------------------------------------------------
*/
export const login = (state = loginState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: action.payload };
    case LOGOUT:
      return { ...state, isLoggedOut: action.payload };
    default: {
      break;
    }
  }
  return state;
};

export default login;
