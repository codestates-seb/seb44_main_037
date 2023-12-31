const { INVALID_REQUEST, OK, INSUFFICIENT_POINT, FAILED } = require("../../../constants/messages");
const Product = require("../../../models/Product")

async function bid(req, res, next) {
  const { productId, price } = req.body;
  const user = req.user;
  const now = Date.now();

  try {
    const product = await Product.findOne({ _id: productId });

    if (!productId || !price || !product) {
      return res
        .status(400)
        .send({
          result: FAILED,
          message: INVALID_REQUEST
        });
    }

    const latestBidPrice = product.history.length > 0
      ? product.history[product.history.length - 1].bidPrice
      : product.bidInfo.startPrice;
    const isSufficientPrice = price >= (latestBidPrice + product.bidInfo.bidUnit);
    const isValidUnit = price % product.bidInfo.bidUnit === 0;

    if (!isSufficientPrice || !isValidUnit) {
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

    if (user.point < price) {
      return res
        .status(400)
        .send({
          result: FAILED,
          message: INSUFFICIENT_POINT
        });
    }

    const productFilter = { _id: product._id };
    const productUpdate = {
      $push: { history: { bider: user._id, bidPrice: price, createdAt: now } }
    }

    const updatedProduct = await Product.findOneAndUpdate(
      productFilter,
      productUpdate,
      { new: true }
    ).populate(["seller", "buyer", "history.bider"]);

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

module.exports = bid;
