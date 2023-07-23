const { INVALID_REQUEST, UNEXPECTED_ERROR, OK, INSUFFICIENT_POINT } = require("../../../constants/messages");
const ChatRoom = require("../../../models/ChatRoom");
const Product = require("../../../models/Product");
const User = require("../../../models/User");

async function buy(req, res, next) {
  const { productId } = req.body;
  const user = req.user;

  try {
    const product = await Product
      .findOne({ _id: productId })
      .populate(["seller"]);

    if (!productId || !product) {
      return res
        .status(400)
        .send({
          result: FAILED,
          message: INVALID_REQUEST
        });
    }

    if (!product.isOnSale) {
      return res
        .status(400)
        .send({
          result: FAILED,
          message: INVALID_REQUEST
        });
    }

    if (user.point < product.price) {
      return res
        .status(400)
        .send({
          result: FAILED,
          message: INSUFFICIENT_POINT
        });
    }
    const productFilter = { _id: product._id };
    const productUpdate = {
      isOnSale: false,
      buyer: user._id
    };

    const updatedProduct = await Product.findOneAndUpdate(productFilter, productUpdate, { new: true });

    const buyerFilter = { _id: user._id };
    const buyerUpdate = {
      point: user.point - product.price,
      $push: {
        shoppingList: productId,
        pointHistory: {
          title: `${product.title.substring(0, 8).trim()}... 구매`,
          price: product.price,
          balance: user.point - product.price,
          createdAt: Date.now(),
        }
      }
    };

    await User.findOneAndUpdate(buyerFilter, buyerUpdate);

    const sellerFilter = { _id: product.seller._id };
    const sellerUpdate = {
      point: user.point + product.price,
      $push: {
        salesList: productId,
        pointHistory: {
          title: `${product.title.substring(0, 8).trim()}... 판매`,
          price: product.price,
          balance: user.point + product.price,
          createdAt: Date.now(),
        }
      }
    };

    await User.findOneAndUpdate(sellerFilter, sellerUpdate);

    await ChatRoom.create({
      product: {
        _id: product._id,
        title: product.title
      },
      buyer: {
        _id: user._id,
        nickname: user.nickname,
        numOfViewedMessage: 0
      },
      seller: {
        _id: product.seller._id,
        nickname: product.seller.nickname,
        numOfViewedMessage: 0
      },
      numOfMessages: 0,
      messages: [],
    });

    return res
      .status(200)
      .send({
        result: OK,
        payload: { product: updatedProduct }
      });
  } catch (error) {
    if (error.status) {
      next(error);
    }

    next({ message: error });
  }
}

module.exports = buy;
