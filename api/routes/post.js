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
const { isSignedIn } = require("../controllers/auth");

const router = express.Router();

//create a post
router.post("/", isSignedIn, fileUploader.single("file"), createAPost);

//update a post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", deletePost);

//like or dislike a post
router.put("/:id/like", isSignedIn, likeAPost);

//get a post
router.get("/:id", isSignedIn, getAPost);

//get timeline posts
router.get("/timeline/:userId", isSignedIn, getTimelinePosts);

//get user all posts
router.get("/profile/:username", isSignedIn, getUserAllPosts);

module.exports = router;
