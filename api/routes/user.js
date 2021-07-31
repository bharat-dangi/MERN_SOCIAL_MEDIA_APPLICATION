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
} = require("../controllers/user");
const router = express.Router();

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

//upload cover Image
router.patch("/uploadCoverImg", uploadCoverImage);

//upload Profile Image
router.patch("/uploadProfileImg", uploadProfileImage);

module.exports = router;
