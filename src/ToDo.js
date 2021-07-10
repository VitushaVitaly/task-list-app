import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setTodoId,
  setTodoIsCompleted,
  setTodoStatus,
  setTodoText
} from "./reducers/editTodo";

function ToDo({ todo, toggleTask }) {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(state => state.user.isAuthorized);
  const editedId = useSelector(state => state.editTodo.id);
  const editedText = useSelector(state => state.editTodo.text);
  const editedIsComplited = useSelector(state => state.editTodo.isCompleted);
  const token = useSelector(state => state.user.token);

  const editTodo = (todo) => {
    const isCompleted = todo.status === 10 || todo.status === 11;
    dispatch(setTodoId(todo.id));
    dispatch(setTodoIsCompleted(isCompleted));
    dispatch(setTodoText(todo.text));
  }

  const saveTodo = async () => {
    const isEdited = todo.text !== editedText;
    let status;
    const params = {};

    console.log(editedIsComplited, isEdited)

    if (!editedIsComplited && !isEdited) status = 0
    else if (!editedIsComplited && isEdited) {
      status = 1;
      params.text = editedText;
    }
    else if (editedIsComplited && !isEdited) status = 10
    else {
      status = 11;
      params.text = editedText;
    }

    params.status = status;
    params.token = token;

    const data = new FormData();
    for (const param in params)
      data.append(param, params[param])

    try {
      const response = await axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${editedId}/?developer=Vitaly`, data);
      console.log(response);
      return response;
    }
    catch (error) {
      console.error(error);
    }
  }

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
    }
  }

  return (
    <div className="d-flex flex-column border mb-3 rounded-2">
      <div className="d-flex border-bottom">
        <div className="flex-fill border-end p-1">Автор: {todo.username}</div>
        <div className="flex-fill p-1">Email: {todo.email}</div>
      </div>
      <div className="d-flex border-bottom">
        {isAuthorized
          ?
          <>
            {editedId !== todo.id
              ?
              <>
                <div className="p-1 flex-grow-1">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" disabled checked={todo.complete} onClick={() => toggleTask(todo.id)} />
                    <label className="form-check-label">
                      {todo.text}
                    </label>
                  </div>
                </div>
                <div className="p-1" title="Редактировать" onClick={() => editTodo(todo)}>
                  <i className="bi bi-pencil"></i>
                </div>
              </>
              :
              <>
                <div className="p-1 flex-grow-1">
                  <div className="form-check">
                    <input name="isCompleted" className="form-check-input" type="checkbox" checked={todo.complete} onClick={handleChange} />
                    <label className="form-check-label">
                      <input name="text" className="form-control" defaultValue={todo.text} onChange={handleChange} />
                    </label>
                  </div>
                </div>
                <div className="p-1" title="Сохранить" onClick={saveTodo}>
                  <i className="bi bi-save"></i>
                </div>
              </>
            }
          </>
          :
          <div className="flex-fill p-1">
            {todo.text}
          </div>
        }
      </div>
      <div className="d-flex">
        <div className="flex-fill p-1">
          {todo.status}
        </div>
      </div>
    </div>
  )
}

export default ToDo;