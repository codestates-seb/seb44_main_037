const express = require("express");
const router = express.Router();

const checkUserInfo = require("./controllers/common/checkUserInfo");
const getAllChatRooms = require("./controllers/chat/getAllChatRooms");
const createMessage = require("./controllers/chat/createMessage");

router.post("/getAllChatRooms", checkUserInfo, getAllChatRooms);

router.post("/newMessage", checkUserInfo, createMessage);

module.exports = router;
