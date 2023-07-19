require("dotenv").config();

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
  },
  nickname: {
    type: String,
    required: [true, "Username cannot be blank"],
  },
  image: {
    type: String,
    required: [true, "Image cannot be blank"],
  },
  salesList: [{
    type: ObjectId,
    ref: "Product",
  }],
  shoppingList: [{
    type: ObjectId,
    ref: "Product",
  }],
  point: {
    type: Number,
    required: [true, "point cannot be blank"],
  },
  pointHistory: [{
    title: String,
    chargeId: String,
    productId: ObjectId,
    price: Number,
    balance: Number,
    createdAt: Number,
  }],
});

module.exports = mongoose.model("User", userSchema);
