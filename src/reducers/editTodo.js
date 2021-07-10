const SET_TODO_ID = "SET_TODO_ID";
const SET_TODO_STATUS = "SET_TODO_STATUS";
const SET_TODO_TEXT = "SET_TODO_TEXT";
const SET_TODO_COMPLETED = "SET_TODO_COMPLETED";


const defaultState = {
  id: null,
  isCompleted: "",
  status: "",
  text: ""
}

export default function editTodoReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TODO_ID:
      return {
        ...state,
        id: action.payload
      }
    case SET_TODO_STATUS:
      return {
        ...state,
        status: action.payload
      }
    case SET_TODO_TEXT:
      return {
        ...state,
        text: action.payload
      }
      case SET_TODO_COMPLETED:
      return {
        ...state,
        isCompleted: action.payload
      }
    default:
      return state;
  }
}

export const setTodoId = id => ({ type: SET_TODO_ID, payload: id });
export const setTodoIsCompleted = isCompleted => ({ type: SET_TODO_COMPLETED, payload: isCompleted });
export const setTodoStatus = status => ({ type: SET_TODO_STATUS, payload: status });
export const setTodoText = text => ({ type: SET_TODO_TEXT, payload: text });