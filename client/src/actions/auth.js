import * as api from "../api/auth";
import { LOGOUT, SIGNIN, SIGNUP } from "../constants/auth";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: SIGNIN, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(data);
    dispatch({ type: SIGNUP, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await api.signOut();
    dispatch({ type: LOGOUT });
    window.location.reload();
    // history.push("/login");
  } catch (error) {
    console.log(error);
  }
};

export const clearExpiredToken = (history) => async (dispatch) => {
  try {
    setTimeout(() => {
      dispatch({ type: LOGOUT });
      history.push("/login");
    }, 3540000);
  } catch (error) {
    console.log(error);
  }
};
