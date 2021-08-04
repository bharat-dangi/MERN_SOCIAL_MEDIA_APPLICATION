const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unFollowUser,
  getFriends,
  uploadCoverImage,
  uploadProfileImage,
  uploadImage,
} = require("../controllers/user");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User");

//update user
router.put("/:id", updateUser);

//delete user
router.delete("/:id", deleteUser);

//get a user
router.get("/", getUser);

//get friends
router.get("/friends/:userId", getFriends);

//follow a user
router.put("/:id/follow", followUser);

//unfollow a user
router.put("/:id/unfollow", unFollowUser);

//upload image
router.patch(
  "/:username/uploadImage",
  fileUploader.single("file"),
  uploadImage
);

module.exports = router;
