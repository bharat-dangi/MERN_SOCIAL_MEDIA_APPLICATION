import { useRef } from "react";
import "./login.css";
import { CircularProgress } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearExpiredToken, signIn } from "../../actions/auth";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const isFetching = false;
  const error = false;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    dispatch(signIn(user, history));
    dispatch(clearExpiredToken(history));
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">BharatSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input
              placeholder="Email"
              required
              type="email"
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              required
              type="password"
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <div className="errorMessageContainer">
              <span className="errorMessage">{error}</span>
            </div>
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link
              to="/register"
              className="loginRegisterButton"
              style={{ textDecoration: "none" }}
            >
              <div className="loginRegisterButtonText">
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
