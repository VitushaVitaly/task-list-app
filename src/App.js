import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./reducers";
import { setAuthorized, setToken } from "./reducers/user";

const App = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(state => state.user.isAuthorized);

  const logout = () => {
    dispatch(setToken(""));
    dispatch(setAuthorized(false));
  }

  return (
    <Router>
      <nav className="navbar-expand-lg navbar-light bg-light rounded-bottom rounded-2">
        <ul className="nav justify-content-end">
          <li className="nav-item"><Link className="nav-link" to="/">Список задач</Link></li>
          {
            !isAuthorized
              ? <li className="nav-item"><Link className="nav-link" to="/login">Вход</Link></li>
              : <li className="nav-item" onClick={logout}><Link className="nav-link" to="/">Выход</Link></li>
          }
        </ul>
      </nav>

      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  )
}

function AppWrapper() {
  return (
    <Provider store={store}>
      <div style={{ margin: "auto", width: "50%" }}>
        <div className="container">
          <App />
        </div>
      </div>
    </Provider>
  )
}

export default AppWrapper;
