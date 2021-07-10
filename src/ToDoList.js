import ToDo from "./ToDo";
import { useDispatch } from "react-redux";

function ToDoList({ todos, handleToggle, setSortBy, setOrderBy }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    switch (e.currentTarget.name) {
      case "sortBy":
        dispatch(setSortBy(e.currentTarget.value));
        break;
      case "orderBy":
        dispatch(setOrderBy(e.currentTarget.value));
        break;
    }
  }

  return (
    <div className="mt-3">
      <div className="mb-3">
        Сортировка:
        <select className="form-select w-auto d-inline ms-3" name="sortBy" onChange={handleChange}>
          <option value="username">Имя пользователя</option>
          <option value="email">Email</option>
          <option value="status">Статус</option>
        </select>
        <select className="form-select w-auto d-inline ms-3" name="orderBy" onChange={handleChange}>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
      <div>
        {
          todos.map((todo) => {
            return (
              <ToDo
                todo={todo}
                key={todo.id}
                toggleTask={handleToggle}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default ToDoList;