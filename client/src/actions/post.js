import * as api from "../api/post";
import {
  CREATE_POST,
  GET_PROFILE_POST,
  GET_TIMELINE_POST,
  UPLOAD_POST_FILE,
} from "../constants/post";

export const getProfilePost = (username) => async (dispatch) => {
  try {
    const { data } = await api.getProfilePost(username);
    console.log("PROFILE POST", data);
    dispatch({ type: GET_PROFILE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getTimelinePost = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getTimelinePost(userId);

    dispatch({ type: GET_TIMELINE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const uploadPostFile = (data) => async (dispatch) => {
  try {
    await api.uploadPostFile(data);
    dispatch({ type: UPLOAD_POST_FILE });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (newPost) => async (dispatch) => {
  try {
    await api.createPost(newPost);
    dispatch({ type: CREATE_POST });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
