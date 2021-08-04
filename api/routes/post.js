const express = require("express");
const {
  createAPost,
  updatePost,
  deletePost,
  likeAPost,
  getAPost,
  getTimelinePosts,
  getUserAllPosts,
} = require("../controllers/post");
const fileUploader = require("../config/cloudinary.config");

const router = express.Router();

//create a post
router.post("/", fileUploader.single("file"), createAPost);

//update a post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", deletePost);

//like or dislike a post
router.put("/:id/like", likeAPost);

//get a post
router.get("/:id", getAPost);

//get timeline posts
router.get("/timeline/:userId", getTimelinePosts);

//get user all posts
router.get("/profile/:username", getUserAllPosts);

module.exports = router;
