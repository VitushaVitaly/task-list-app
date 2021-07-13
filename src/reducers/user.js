const SET_USERNAME = "SET_USERNAME";
const SET_PASSWORD = "SET_PASSWORD";

const defaultState = {
  name: "",
  password: "",
}

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        name: action.payload
      }
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      }
    default:
      return state;
  }
}

export const setUsername = name => ({ type: SET_USERNAME, payload: name });
export const setPassword = password => ({ type: SET_PASSWORD, payload: password });