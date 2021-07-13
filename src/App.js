import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import { Provider, useSelector, useDispatch } from "react-redux";
import storage from "./reducers";
import { setToken } from "./reducers/auth";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const logout = () => dispatch(setToken(""));

  return (
    <Router>
      <nav className="navbar-expand-lg navbar-light bg-light rounded-bottom rounded-2">
        <ul className="nav justify-content-end">
          <li className="nav-item"><Link className="nav-link" to="/">Список задач</Link></li>
          {
            token
              ? <li className="nav-item" onClick={logout}><Link className="nav-link" to="/">Выход</Link></li>
              : <li className="nav-item"><Link className="nav-link" to="/login">Вход</Link></li>
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

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

function AppWrapper() {
  const store = storage();
  store.subscribe(() => {
    saveState({
      token: store.getState().auth.token
    });
  });

  const loadToken = () => {
    const state = loadState();
    if (state && state.token !== undefined) {
      store.dispatch(setToken(state.token));
    }
  };

  window.addEventListener("storage", (e) => {
    if (!e.key || e.key !== "state")
      return;

    if (e.newValue === e.oldValue)
      return;

    loadToken();
  }, false);

  loadToken();

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
