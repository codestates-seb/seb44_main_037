const { INVALID_REQUEST, UNEXPECTED_ERROR, OK, INSUFFICIENT_POINT } = require("../../../constants/messages");
const Product = require("../../../models/Product");
const User = require("../../../models/User");

async function bidInstantly(req, res, next) {
  const { productId } = req.body;
  const user = req.user;
  const now = Date.now();

  try {
    const product = await Product.findOne({ _id: productId });

    if (!productId || !product) {
      return res
        .status(400)
        .send({
          result: FAILED,
          message: INVALID_REQUEST
        });
    }

    if (user.point < product.bidInfo.instantBidPrice) {
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
      $push: { history: { bider: user._id, bidPrice: product.bidInfo.instantBidPrice, createdAt: now } }
    }

    const updatedProduct = await Product.findOneAndUpdate(productFilter, productUpdate, { new: true });

    const buyerFilter = { _id: user._id };
    const buyerUpdate = {
      point: user.point - product.bidInfo.instantBidPrice,
      $push: {
        shoppingList: productId,
        pointHistory: {
          title: `${product.title.substring(0, 8).trim()}... 구매`,
          price: product.bidInfo.instantBidPrice,
          balance: user.point - product.bidInfo.instantBidPrice,
          createdAt: Date.now(),
        }
      }
    };

    await User.findOneAndUpdate(buyerFilter, buyerUpdate);

    const sellerFilter = { _id: product.seller._id };
    const sellerUpdate = {
      point: user.point + product.bidInfo.instantBidPrice,
      $push: {
        salesList: productId,
        pointHistory: {
          title: `${product.title.substring(0, 8).trim()}... 판매`,
          price: product.bidInfo.instantBidPrice,
          balance: user.point + product.bidInfo.instantBidPrice,
          createdAt: Date.now(),
        }
      }
    };

    await User.findOneAndUpdate(sellerFilter, sellerUpdate);

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

    next({ message: UNEXPECTED_ERROR });
  }
}

module.exports = bidInstantly;
