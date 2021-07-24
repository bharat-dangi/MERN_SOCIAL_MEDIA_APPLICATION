import {
  FETCH_A_USER,
  FETCH_FRIEND_LIST,
  FETCH_POST_USER,
  FOLLOW,
  UNFOLLOW,
} from "../constants/user";

const userReducer = (state = { user: [], friendList: [] }, action) => {
  switch (action.type) {
    case FETCH_A_USER:
      return { ...state, user: [...state.user, action?.payload] };

    case FETCH_POST_USER:
      return { ...state, user: [...state.user, action?.payload] };

    case FETCH_FRIEND_LIST:
      return { ...state, friendList: action?.payload };

    case FOLLOW:
    case UNFOLLOW:
      return state;

    default:
      return state;
  }
};

export default userReducer;
// , postUser: []
// postUser: [...state.postUser, action.payload]
