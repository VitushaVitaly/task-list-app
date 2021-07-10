import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import todosReducer from "./todos";
import addTodoReducer from "./addTodo";
import userReducer from "./user";
import editTodoReducer from "./editTodo";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todos: todosReducer,
  addTodo: addTodoReducer,
  editTodo: editTodoReducer,
  user: userReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));