const express = require("express");
const {
  createNewConversation,
  getConversationOfAUser,
  getConversationIncludingTwoUserId,
} = require("../controllers/conversation");
const router = express.Router();

//new conversation
router.post("/", createNewConversation);

//get conversation of a user
router.get("/:userId", getConversationOfAUser);

//get conversation includes two userId
router.get(
  "/find/:firstUserId/:secondUserId",
  getConversationIncludingTwoUserId
);

module.exports = router;
