import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("profile")) {
      return JSON.parse(localStorage.getItem("profile"));
    } else {
      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
