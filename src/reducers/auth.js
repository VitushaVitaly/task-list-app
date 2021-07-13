const SET_TOKEN = "SET_TOKEN";

export default function tokenReducer(state = "", action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
}

export const setToken = token => ({ type: SET_TOKEN, payload: token });