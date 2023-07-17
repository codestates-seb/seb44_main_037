const express = require("express");
const router = express.Router();

const getAccessToken = require("./controllers/users/getAccessToken");
const getUserEmail = require("./controllers/users/getUserEmail");
const issueTokens = require("./controllers/users/issueTokens");
const logout = require("./controllers/users/logout");
const register = require("./controllers/users/register");
const reissueAccessToken = require("./controllers/common/reissueAccessToken");
const { multerUpload } = require("./controllers/helper/s3Functions");
const checkUserInfo = require("./controllers/common/checkUserInfo");
const responseUserInfo = require("./controllers/users/responseUserInfo");

router.get("/", checkUserInfo, responseUserInfo);

router.post("/login", getAccessToken, getUserEmail, issueTokens);

router.get("/logout", logout);

router.post("/register", multerUpload.single("imageData"), register, issueTokens);

router.get("/silent-refresh", reissueAccessToken);

module.exports = router;
