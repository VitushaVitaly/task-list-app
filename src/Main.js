import { useEffect } from 'react';
import ToDoForm from "./ToDoForm";
import ToDoList from './ToDoList';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTodoList,
  setTotalTodo,
  setOrderBy,
  setSortBy,
  setCurrentPage,
  setIsLoaded
} from "./reducers/todos";
import {
  setTodoUsername,
  setTodoEmail,
  setTodoText
} from "./reducers/addTodo";
import { postCreate, getList } from './requests';
import Popup from "./popup";
import Spinner from './Spinner';

function Main() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.list);
  const sortBy = useSelector(state => state.todos.sortBy);
  const orderBy = useSelector(state => state.todos.orderBy);
  const currentPage = useSelector(state => state.todos.currentPage);
  const total = useSelector(state => state.todos.total);
  const isLoaded = useSelector(state => state.todos.isLoaded);

  const addTask = async (name, email, text) => {
    try {
      const response = await postCreate(name, email, text);
      if (response.data.status === "ok") {
        Popup("Задача успешно добавлена!");
        dispatch(setTodoUsername(""));
        dispatch(setTodoEmail(""));
        dispatch(setTodoText(""));
        fetchTodoList();
      }
      else {
        Popup(response.data.message);
      }
    }
    catch (error) {
      console.error(`Error while fetchig data: ${error}`);
    }
  };

  const paginate = number => dispatch(setCurrentPage(number));

  const fetchTodoList = async () => {
    try {
      const response = await getList(sortBy, orderBy, currentPage);
      if (response.data.status === "ok") {
        dispatch(setTodoList(response.data.message.tasks));
        dispatch(setTotalTodo(response.data.message.total_task_count));
        dispatch(setIsLoaded(true));
      }
    }
    catch (error) {
      console.error(`Error while fetchig data: ${error}`);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, [sortBy, orderBy, currentPage])

  return (
    <div className="d-flex flex-column">
      <ToDoForm addTask={addTask} />
      {isLoaded
        ?
        <>
          <ToDoList todos={todos}
            setSortBy={setSortBy}
            setOrderBy={setOrderBy}
          />
          <Pagination
            totalTasks={total}
            paginate={paginate}
          />
        </>
        : <Spinner />

    }
    </div>
  );
}

export default Main;
