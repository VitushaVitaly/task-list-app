import { useEffect } from 'react';
import axios from "axios";
import ToDoForm from "./ToDoForm";
import ToDoList from './ToDoList';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTodoList,
  setTotalTodo,
  setOrderBy,
  setSortBy,
  setCurrentPage
} from "./reducers/todos"

function Main() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.list);
  const sortBy = useSelector(state => state.todos.sortBy);
  const orderBy = useSelector(state => state.todos.orderBy);
  const currentPage = useSelector(state => state.todos.currentPage);
  const total = useSelector(state => state.todos.total);

  const addTask = (name, email, text) => {
    if (name) {
      const form = new FormData();
      form.append('username', name);
      form.append('email', email);
      form.append('text', text);

      axios.post('https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Vitaly', form)
        .then(function (response) {
          console.log(response);
          if (response.data.status === "ok") {
            fetchTodoList();
          }
        })
        .catch(function (error) {
          console.error(`Error while fetchig data: ${error}`);
        });
    }
  }

  const handleToggle = (id) => {
    setTodoList([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo }
      )
    ])
  }

  const paginate = number => dispatch(setCurrentPage(number));

  async function makeRequest(url, setState, params) {
    await axios.get(`${url}/?${new URLSearchParams(params)}`)
      .then(function (response) {
        console.log(response);
        dispatch(setState(response.data));
        dispatch(setTotalTodo(response.data.message.total_task_count));
      })
      .catch(function (error) {
        console.error(`Error while fetchig data: ${error}`);
      });
  };

  function fetchData(params) {
    makeRequest('https://uxcandy.com/~shapoval/test-task-backend/v2', (o) => setTodoList(o.message.tasks), params);
  };

  const fetchTodoList = () => fetchData({ developer: 'Vitaly', sort_field: sortBy, sort_direction: orderBy, page: currentPage });

  useEffect(() => {
    fetchTodoList();
  }, [sortBy, orderBy, currentPage])

  return (
    <div className="d-flex flex-column">
      <ToDoForm addTask={addTask} />
      <ToDoList todos={todos}
        handleToggle={handleToggle}
        setSortBy={setSortBy}
        setOrderBy={setOrderBy}
      />
      <Pagination
        totalTasks={total}
        paginate={paginate}
      />
    </div>
  );
}

export default Main;
