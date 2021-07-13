import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setPassword
} from "./reducers/user";
import { setToken } from "./reducers/auth";
import { Redirect } from "react-router";
import { postLogin } from "./requests";
import Popup from "./popup";

function Login() {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.name);
  const password = useSelector(state => state.user.password);
  const token = useSelector(state => state.auth.token);

  const handleChange = (e) => {
    switch (e.currentTarget.name) {
      case 'username':
        dispatch(setUsername(e.currentTarget.value));
        break;
      case 'password':
        dispatch(setPassword(e.currentTarget.value));
        break;
      default:
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postLogin(username, password);
      if (response.data.status === "ok") {
        dispatch(setToken(response.data.message.token));
      }
      else {
        Popup(response.data.message);
      }
    }
    catch (error) {
      console.error(`Error while fetchig data: ${error}`);
    }
  }

  return (
    <div className="p-3 mt-3 border rounded-2 text-center">
      {token && <Redirect to="/" />}
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            name="username"
            value={username}
            type="text"
            autoComplete="username"
            onChange={handleChange}
            placeholder="Имя пользователя"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="password"
            value={password}
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            placeholder="Пароль"
          />
        </div>
        <button className="btn btn-primary">Войти</button>
      </form>
    </div>
  )
}

export default Login;