const express = require("express");
const router = express.Router();

const getAccessToken = require("./controllers/users/getAccessToken");
const getUserEmail = require("./controllers/users/getUserEmail");
const issueTokens = require("./controllers/users/issueTokens");
const logout = require("./controllers/users/logout");
const register = require("./controllers/users/register");
const { multerUpload } = require("./controllers/helper/s3Functions");

router.post("/login", getAccessToken, getUserEmail, issueTokens);

router.get("/logout", logout);

router.post("/register", multerUpload.single("imageData"), register, issueTokens);

module.exports = router;
