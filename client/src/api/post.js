import axios from "axios";

//BASE URL
const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const getProfilePost = (username, token) =>
  API.get(`posts/profile/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTimelinePost = (userId, token) =>
  API.get(`posts/timeline/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const uploadPostFile = (data) => API.post("upload", data);

export const createPost = (postData, token) =>
  API.post("posts", postData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const likeAPost = (postId, likerUserId, token) =>
  API.put(`posts/${postId}/like`, likerUserId, {
    headers: { Authorization: `Bearer ${token}` },
  });
