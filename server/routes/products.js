const express = require("express");
const router = express.Router();

const issueTokens = require("./controllers/users/issueTokens");
const register = require("./controllers/products/register");
const checkUserInfo = require("./controllers/common/checkUserInfo");
const { multerUpload } = require("./controllers/helper/s3Functions");

router.post("/new", multerUpload.array("imagesData"), checkUserInfo, register);

module.exports = router;
