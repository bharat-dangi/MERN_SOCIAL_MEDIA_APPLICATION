import { FETCH_A_USER, FETCH_POST_USER } from "../constants/user";

const userReducer = (state = { user: [], postUser: [] }, action) => {
  switch (action.type) {
    case FETCH_A_USER:
      return { ...state, user: action?.payload };

    case FETCH_POST_USER:
      return { ...state, postUser: [...state.postUser, action.payload] };

    default:
      return state;
  }
};

export default userReducer;
