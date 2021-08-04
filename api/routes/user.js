const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unFollowUser,
  getFriends,
  uploadImage,
  getUserByUsername,
} = require("../controllers/user");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("username", getUserByUsername);

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
  isSignedIn,
  isAuthenticated,
  fileUploader.single("file"),
  uploadImage
);

module.exports = router;
