import axios from "axios";

//BASE URL
const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const getProfilePost = (username) =>
  API.get(`posts/profile/${username}`);

export const getTimelinePost = (userId) => API.get(`posts/timeline/${userId}`);
