import * as api from "../api/user";
import { FETCH_A_USER, FETCH_POST_USER } from "../constants/user";

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
