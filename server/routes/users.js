const express = require("express");
const router = express.Router();

const getAccessToken = require("./controllers/users/getAccessToken");
const getUserEmail = require("./controllers/users/getUserEmail");
const issueTokens = require("./controllers/users/issueTokens");

router.post("/login", getAccessToken, getUserEmail, issueTokens);

module.exports = router;
