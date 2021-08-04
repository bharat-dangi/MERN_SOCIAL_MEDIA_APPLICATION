import * as api from "../api/user";
import {
  FETCH_A_USER,
  FETCH_FRIEND_LIST,
  FETCH_POST_USER,
  FOLLOW,
  UNFOLLOW,
  UPLOAD_COVER_IMG,
  UPLOAD_PROFILE_IMG,
} from "../constants/user";

export const fetchAUser = (username) => async (dispatch) => {
  try {
    const { data } = await api.fetchAUser(username);
    dispatch({ type: FETCH_A_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostUser(userId);
    dispatch({ type: FETCH_POST_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchFriendList = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchFriendList(userId);
    dispatch({ type: FETCH_FRIEND_LIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const followUser = (userId, followerUserId) => async (dispatch) => {
  try {
    await api.followUser(userId, followerUserId);
    dispatch({ type: FOLLOW });
  } catch (error) {
    console.log(error);
  }
};

export const unFollowUser = (userId, followerUserId) => async (dispatch) => {
  try {
    await api.unFollowUser(userId, followerUserId);
    dispatch({ type: UNFOLLOW });
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = (fileToUpload, username) => async (dispatch) => {
  try {
    const { data } = await api.uploadImage(fileToUpload, username);
    if (data.profile === true) {
      dispatch({ type: UPLOAD_PROFILE_IMG, payload: data });
    } else {
      dispatch({ type: UPLOAD_COVER_IMG, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
};
