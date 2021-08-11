import * as api from "../api/post";
import { END_LOADING, START_LOADING } from "../constants/auth";
import {
  CREATE_POST,
  GET_PROFILE_POST,
  GET_TIMELINE_POST,
  LIKE_A_POST,
  UPLOAD_POST_FILE,
} from "../constants/post";

export const getProfilePost = (username, token) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getProfilePost(username, token);
    dispatch({ type: GET_PROFILE_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getTimelinePost = (userId, token) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getTimelinePost(userId, token);

    dispatch({ type: GET_TIMELINE_POST, payload: data });
    dispatch({ type: END_LOADING });
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
export const createPost = (newPost, token) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(newPost, token);
    dispatch({ type: CREATE_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const likeAPost = (postId, likerUserId, token) => async (dispatch) => {
  try {
    await api.likeAPost(postId, likerUserId, token);
    dispatch({ type: LIKE_A_POST });
  } catch (error) {
    console.log(error);
  }
};
