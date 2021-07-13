import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import todosReducer from "./todos";
import addTodoReducer from "./addTodo";
import userReducer from "./user";
import editTodoReducer from "./editTodo";
import tokenReducer from "./auth";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const Store = () => {

  const rootReducer = combineReducers({
    todos: todosReducer,
    addTodo: addTodoReducer,
    editTodo: editTodoReducer,
    user: userReducer,
    auth: tokenReducer
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}

export default Store;