const express = require("express");
const router = express.Router();

const register = require("./controllers/products/register");
const checkUserInfo = require("./controllers/common/checkUserInfo");
const { multerUpload } = require("./controllers/helper/s3Functions");
const getProduct = require("./controllers/products/getProduct");

router.get("/:id", getProduct);

router.post("/new", multerUpload.array("imagesData"), checkUserInfo, register);

module.exports = router;
