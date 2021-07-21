import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

const Routes = () => {
  const user = JSON.parse(localStorage.getItem("profile")) || null;
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route exact path="/profile/:username" component={Profile} />
      </Switch>
    </Router>
  );
};

export default Routes;
