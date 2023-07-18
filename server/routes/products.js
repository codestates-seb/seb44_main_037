const express = require("express");
const router = express.Router();

const register = require("./controllers/products/register");
const checkUserInfo = require("./controllers/common/checkUserInfo");
const { multerUpload } = require("./controllers/helper/s3Functions");
const getProduct = require("./controllers/products/getProduct");
const bidInstantly = require("./controllers/products/bidInstantly");
const getAllProducts = require("./controllers/products/getAllProducts");
const bid = require("./controllers/products/bid");
const closeBid = require("./controllers/products/closeBid");
const buy = require("./controllers/products/buy");
const getServerTime = require("./controllers/products/getServerTime");

router.get("/", getAllProducts);

router.post("/new", multerUpload.array("imagesData"), checkUserInfo, register);

router.post("/buy", checkUserInfo, buy);

router.post("/bid", checkUserInfo, bid);

router.post("/bid/close", checkUserInfo, closeBid);

router.post("/bid/instant", checkUserInfo, bidInstantly);

router.get("/time", getServerTime);

router.get("/:id", getProduct);

module.exports = router;
