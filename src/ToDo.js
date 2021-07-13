import { useSelector, useDispatch } from "react-redux";
import {
  setTodoId,
  setTodoIsCompleted,
  setTodoText
} from "./reducers/editTodo";
import { setTodoList } from "./reducers/todos";
import { postEdit } from "./requests";
import { todoStatus } from "./core";
import Popup from "./popup";

function ToDo({ todo }) {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.list);
  const editedId = useSelector(state => state.editTodo.id);
  const editedText = useSelector(state => state.editTodo.text);
  const editedIsComplited = useSelector(state => state.editTodo.isCompleted);
  const token = useSelector(state => state.auth.token);

  const editTodo = (todo) => {
    const isCompleted = todo.status === 10 || todo.status === 11;
    dispatch(setTodoId(todo.id));
    dispatch(setTodoIsCompleted(isCompleted));
    dispatch(setTodoText(todo.text));
  };

  const saveTodo = async () => {
    const isEdited = todo.text !== editedText;

    let status = isEdited ? 11 : 10;
    if (!editedIsComplited)
      status %= 10;

    try {
      const response = await postEdit(editedId, token, status, editedText);
      if (response.data.status === "ok") {
        dispatch(setTodoList([
          ...todos.map((todo) =>
            todo.id === editedId ? { ...todo, text: editedText, status } : todo
          )
        ]));
        dispatch(setTodoId(null));
      }
      else {
        Popup(response.data.message);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    switch (e.currentTarget.name) {
      case "isCompleted": {
        dispatch(setTodoIsCompleted(e.currentTarget.checked));
        break;
      }
      case "text": {
        dispatch(setTodoText(e.currentTarget.value));
        break;
      }
      default:
        break;
    }
  };

  const edited = editedId !== todo.id;

  return (
    <div className="d-flex flex-column border mb-3 rounded-2">
      <div className="d-flex border-bottom">
        <div className="w-50 border-end p-1">Автор: {todo.username}</div>
        <div className="w-50 p-1">Email: {todo.email}</div>
      </div>
      <div className="d-flex border-bottom align-items-center">
        {token
          ?
          <>
            <div className="p-1">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleChange}
                name={edited ? "" : "isCompleted"}
                checked={edited ? todoStatus[todo.status][0] : editedIsComplited}
                disabled={edited ? true : false}
              />
            </div>
            <div className="p-1 flex-grow-1">
              {edited
                ? todo.text
                : <input name="text" className="form-control" defaultValue={todo.text} onChange={handleChange} />
              }
            </div>
            <div className="p-1 btn" title={edited ? "Редактировать" : "Сохранить"} onClick={() => edited ? editTodo(todo) : saveTodo()}>
              <i className={edited ? "bi bi-pencil" : "bi bi-save"}></i>
            </div>
          </>
          :
          <div className="flex-fill p-1">
            {todo.text}
          </div>
        }
      </div>
      <div className="d-flex">
        <div className="flex-fill p-1">
          {todoStatus[todo.status][1]}
        </div>
      </div>
    </div>
  )
}

export default ToDo;