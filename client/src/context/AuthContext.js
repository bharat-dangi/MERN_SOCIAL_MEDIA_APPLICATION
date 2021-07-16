import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("auth")),
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// {
//   _id: "60ceb25b2b556d36905ebee2",
//   profilePicture: "person/1.jpeg",
//   coverPicture: "",
//   followers: [],
//   followings: ["60d7468f144646024c3e0a1e", "60d7074bed677a3c6c7ebfb3"],
//   isAdmin: false,
//   username: "khuman",
//   email: "khuman@gmail.com",
//   password: "$2b$10$XJ/43ZUi0HpDIZ/mJLgkouP4cVbxIgJxo3iJuLDk15p9WmrCRyoEC",
//   city: "Kathmandu",
//   from: "Dang",
//   desc: "BBA Graduate",
//   relationship: 2,
// }
