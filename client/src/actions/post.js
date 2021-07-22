import * as api from "../api/post";
import { GET_PROFILE_POST, GET_TIMELINE_POST } from "../constants/post";

export const getProfilePost = (username) => async (dispatch) => {
  try {
    const { data } = await api.getProfilePost(username);
    console.log("PROFILE POST",data);
    dispatch({ type: GET_PROFILE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getTimelinePost = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getTimelinePost(userId);
    console.log("TIMELINE POST",data);
    dispatch({ type: GET_TIMELINE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
