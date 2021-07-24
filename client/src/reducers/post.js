import {
  CREATE_POST,
  GET_PROFILE_POST,
  GET_TIMELINE_POST,
  LIKE_A_POST,
  UPLOAD_POST_FILE,
} from "../constants/post";

const postReducer = (state = { post: [] }, action) => {
  switch (action.type) {
    case GET_PROFILE_POST:
    case GET_TIMELINE_POST:
      return { ...state, post: action?.payload };

    case UPLOAD_POST_FILE:
    case LIKE_A_POST:
      return state;

    case CREATE_POST:
      return { ...state, post: [...state.post, action.payload] };

    default:
      return state;
  }
};

export default postReducer;
