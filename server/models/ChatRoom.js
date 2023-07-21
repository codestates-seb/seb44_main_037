const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const message = mongoose.Schema({
  user: {
    userId: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
  }
});

const chatRoomSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  buyer: {
    _id: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    numOfViewedMessage : {
      type: Number
    }
  },
  seller: {
    _id: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    numOfViewedMessage : {
      type: Number
    }
  },
  numOfMessages : {
    type: Number,
    required: true
  },
  messages: [message]
});

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
