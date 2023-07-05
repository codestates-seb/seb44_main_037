const express = require("express");
const router = express.Router();

const getAccessToken = require("./controllers/users/getAccessToken");
const getUserEmail = require("./controllers/users/getUserEmail");
const issueTokens = require("./controllers/users/issueTokens");
const logout = require("./controllers/users/logout");

router.post("/login", getAccessToken, getUserEmail, issueTokens);

router.get("/logout", logout);

module.exports = router;
