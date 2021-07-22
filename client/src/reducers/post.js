import { GET_PROFILE_POST, GET_TIMELINE_POST } from "../constants/post";

const postReducer = (state = { post: [] }, action) => {
  switch (action.type) {
    case GET_PROFILE_POST:
    case GET_TIMELINE_POST:
      return { ...state, post: action?.payload };

    default:
      return state;
  }
};

export default postReducer;
