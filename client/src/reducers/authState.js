import { GET_TOKEN, VERIFY_TOKEN } from "../actions/actionTypes";

const initialState = {
  token: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    case VERIFY_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    default:
      return state;
  }
}
