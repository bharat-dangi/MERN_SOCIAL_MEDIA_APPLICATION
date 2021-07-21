import * as api from "../api/auth";
import { SIGNIN, SIGNUP } from "../constants/auth";

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
