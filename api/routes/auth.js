const express = require("express");
const { register, login, logOut } = require("../controllers/auth");
const router = express.Router();

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

//LOGOUT
router.post("/logout", logOut);

module.exports = router;
