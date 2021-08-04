import axios from "axios";

//BASE URL
const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const signIn = (formData) => API.post(`auth/login`, formData);

export const signUp = (formData) => API.post(`auth/register`, formData);

export const signOut = () => API.get(`auth/logout`);
