const SET_TODO_LIST = "SET_TODO_LIST";
const SET_TOTAL_TODO = "SET_TOTAL_TODO";
const SET_SORT_BY = "SET_SORT_BY";
const SET_ORDER_BY = "SET_ORDER_BY";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_IS_LOADED = "SET_IS_LOADED";

const defaultState = {
  list: [],
  total: 0,
  sortBy: "username",
  orderBy: "asc",
  currentPage: 1,
  isLoaded: false
}

export default function todosReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TODO_LIST:
      return {
        ...state,
        list: action.payload
      }
    case SET_TOTAL_TODO:
      return {
        ...state,
        total: action.payload
      }
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      }
    case SET_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
      case SET_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload
      }
    default:
      return state;
  }
}

export const setTodoList = todos => ({ type: SET_TODO_LIST, payload: todos });
export const setTotalTodo = total => ({ type: SET_TOTAL_TODO, payload: total });
export const setSortBy = sortBy => ({ type: SET_SORT_BY, payload: sortBy });
export const setOrderBy = orderBy => ({ type: SET_ORDER_BY, payload: orderBy });
export const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, payload: currentPage });
export const setIsLoaded = isLoaded => ({ type: SET_IS_LOADED, payload: isLoaded });