import { useDispatch, useSelector } from "react-redux";
import {
  setTodoUsername,
  setTodoEmail,
  setTodoText
} from "./reducers/addTodo";

function ToDoForm({ addTask }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.addTodo.username);
  const email = useSelector(state => state.addTodo.email);
  const text = useSelector(state => state.addTodo.text);

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    switch (e.currentTarget.name) {
      case 'user':
        dispatch(setTodoUsername(value));
        break;
      case 'email':
        dispatch(setTodoEmail(value));
        break;
      case 'text':
        dispatch(setTodoText(value));
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(user, email, text);
  }

  return (
    <div className="p-3 mt-3 border rounded-2 text-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            name="user"
            value={user}
            type="text"
            onChange={handleChange}
            placeholder="Имя пользователя"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="email"
            value={email}
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="text"
            value={text}
            type="text"
            placeholder="Текст"
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btn btn-primary">Добавить</button>
        </div>
      </form>
    </div>
  )
}

export default ToDoForm;