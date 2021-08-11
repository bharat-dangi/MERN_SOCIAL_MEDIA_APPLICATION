import axios from "axios";

//BASE URL
const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const fetchAUser = (username) => API.get(`users?username=${username}`);

export const fetchPostUser = (userId) => API.get(`users?userId=${userId}`);

export const fetchFriendList = (userId) => API.get(`users/friends/${userId}`);

export const followUser = (userId, followerUserId) =>
  API.put(`users/${userId}/follow`, followerUserId);

export const unFollowUser = (userId, followerUserId) =>
  API.put(`users/${userId}/unfollow`, followerUserId);

export const uploadImage = (fileToUpload, username, token) =>
  API.patch(`users/${username}/uploadImage`, fileToUpload, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchFriendSuggestion = (username, token) =>
  API.get(`users/${username}/getFriendSuggestion`, {
    headers: { Authorization: `Bearer ${token}` },
  });
