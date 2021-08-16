import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AddFriend from "../pages/addFriend/AddFriend";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Messenger from "../pages/messenger/Messenger";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  const user = JSON.parse(localStorage.getItem("profile"))?.user || null;

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/messenger" component={Messenger} />
        <PrivateRoute exact path="/profile/:username" component={Profile} />
        <PrivateRoute exact path="/addfriend" component={AddFriend} />
      </Switch>
    </Router>
  );
};

export default Routes;
