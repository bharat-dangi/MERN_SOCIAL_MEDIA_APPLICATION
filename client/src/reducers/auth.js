import {
  END_LOADING,
  LOGOUT,
  SIGNIN,
  SIGNUP,
  START_LOADING,
} from "../constants/auth";

const authReducer = (state = { authData: null, isLoading: true }, action) => {
  switch (action.type) {
    case SIGNIN:
    case SIGNUP:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default authReducer;
