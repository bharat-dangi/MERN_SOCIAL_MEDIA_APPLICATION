const express = require("express");
const { addMessage, getMessage } = require("../controllers/message");
const router = express.Router();

//add message
router.post("/", addMessage);

//get message
router.get("/:conversationId", getMessage);

module.exports = router;
