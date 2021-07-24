import axios from "axios";

//BASE URL
const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const fetchAUser = (username) => API.get(`users?username=${username}`);

export const fetchPostUser = (userId) => API.get(`users?userId=${userId}`);
