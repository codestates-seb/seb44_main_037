require("dotenv").config();

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const bidInfo = mongoose.Schema({
  instantBidPrice: {
    type: Number,
    required: true,
  },
  startPrice: {
    type: Number,
    required: true,
  },
  bidUnit: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Number,
    required: true,
  }
});

const history = mongoose.Schema({
  bider: {
    type: ObjectId,
    ref: "User",
  },
  bidPrice: {
    type: Number,
  },
});

const productSchema = new mongoose.Schema({
  seller: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  category: {
    type: String,
    required: [true, "Email cannot be blank"],
    enum: ["fanzine", "stuff", "doll"],
  },
  images: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: [true, "title cannot be blank"],
  },
  description: {
    type: String,
    required: [true, "description cannot be blank"],
  },
  saleType: {
    type: String,
    required: [true, "saleType cannot be blank"],
    enum: ["general", "auction"],
  },
  price: {
    type: Number,
  },
  bidInfo: bidInfo,
  history: [history]
});

productSchema.set('timestamps', { createdAt: true, updatedAt: false });
history.set('timestamps', { createdAt: true, updatedAt: false });

module.exports = mongoose.model("Product", productSchema);
