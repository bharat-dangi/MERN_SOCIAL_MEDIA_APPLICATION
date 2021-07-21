import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signUp } from "../../actions/auth";
import "./register.css";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    // if (passwordConfirm.current.value !== password.current.value) {
    //   password.current.setCustomValidity("Passwords don't match");
    // } else {

    // }
    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    dispatch(signUp(user, history));
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
        <div className="loginRight">
          <form className="loginBox">
            <input
              placeholder="Username"
              ref={username}
              required
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              required
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              ref={password}
              required
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Confirm Password"
              ref={passwordConfirm}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" onClick={handleClick}>
              Sign Up
            </button>
            <Link
              to="/login"
              className="loginRegisterButton"
              style={{ textDecoration: "none" }}
            >
              <div className="loginRegisterButtonText">Log into Account</div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
