const SET_TODO_USERNAME = "SET_TODO_USERNAME";
const SET_TODO_EMAIL = "SET_TODO_EMAIL";
const SET_TODO_TEXT = "SET_TODO_TEXT";

const defaultState = {
  username: "",
  email: "",
  text: ""
}

export default function addTodoReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TODO_USERNAME:
      return {
        ...state,
        username: action.payload
      }
    case SET_TODO_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    case SET_TODO_TEXT:
      return {
        ...state,
        text: action.payload
      }
    default:
      return state;
  }
}

export const setTodoUsername = name => ({ type: SET_TODO_USERNAME, payload: name });
export const setTodoEmail = email => ({ type: SET_TODO_EMAIL, payload: email });
export const setTodoText = text => ({ type: SET_TODO_TEXT, payload: text });