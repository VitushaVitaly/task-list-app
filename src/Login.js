import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setPassword,
  setToken,
  setAuthorized
} from "./reducers/user";
import { Redirect } from "react-router";

function Login() {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.name);
  const password = useSelector(state => state.user.password);
  const isAuthorized = useSelector(state => state.user.isAuthorized);

  const handleChange = (e) => {
    switch (e.currentTarget.name) {
      case 'username':
        dispatch(setUsername(e.currentTarget.value));
        break;
      case 'password':
        dispatch(setPassword(e.currentTarget.value));
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('username', username);
    form.append('password', password);

    axios.post('https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Vitaly', form)
      .then(function (response) {
        console.log(response);
        dispatch(setToken(response.data.message.token));
        dispatch(setAuthorized(true));
      })
      .catch(function (error) {
        console.error(`Error while fetchig data: ${error}`);
      });
  }

  return (
    <div className="p-3 mt-3 border rounded-2 text-center">
      {isAuthorized && <Redirect to="/" />}
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            name="username"
            value={username}
            type="text"
            autoComplete="username"
            onChange={handleChange}
            placeholder="Логин"
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