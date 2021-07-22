import { FETCH_A_USER } from "../constants/user";

const userReducer = (state = {  user: [] }, action) => {
  switch (action.type) {
    case FETCH_A_USER:
      return { ...state, user: action?.payload };
    default:
      return state;
  }
};

export default userReducer;
