import {
  FETCH_A_USER,
  FETCH_FRIEND_LIST,
  FETCH_POST_USER,
  FOLLOW,
  UNFOLLOW,
  UPLOAD_COVER_IMG,
  UPLOAD_PROFILE_IMG,
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

    case UPLOAD_COVER_IMG:
      return {
        ...state,
        user: state.user.map((u) =>
          u._id === action.payload.userId
            ? { ...u, coverPicture: action.payload.coverPicture }
            : u
        ),
      };

    case UPLOAD_PROFILE_IMG:
      return {
        ...state,
        user: state.user.map((u) =>
          u._id === action.payload.userId
            ? { ...u, profilePicture: action.payload.profilePicture }
            : u
        ),
      };

    default:
      return state;
  }
};

export default userReducer;
