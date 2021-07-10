const SET_USERNAME = "SET_USERNAME";
const SET_PASSWORD = "SET_PASSWORD";
const SET_TOKEN = "SET_TOKEN";
const SET_AUTHORIZED = "SET_AUTHORIZED";

const defaultState = {
  name: "",
  password: "",
  token: "",
  isAuthorized: false
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
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case SET_AUTHORIZED:
      return {
        ...state,
        isAuthorized: action.payload
      }
    default:
      return state;
  }
}

export const setUsername = name => ({ type: SET_USERNAME, payload: name });
export const setPassword = password => ({ type: SET_PASSWORD, payload: password });
export const setToken = token => ({ type: SET_TOKEN, payload: token });
export const setAuthorized = authorized => ({ type: SET_AUTHORIZED, payload: authorized });