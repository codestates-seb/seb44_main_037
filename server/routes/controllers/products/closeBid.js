const { INVALID_REQUEST, UNEXPECTED_ERROR, OK, NOT_AUTHORIZED, FAILED } = require("../../../constants/messages");
const Product = require("../../../models/Product");
const User = require("../../../models/User");

async function closeBid(req, res, next) {
  const { productId } = req.body;
  const user = req.user;

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

    if (!user._id.equals(product.seller._id)) {
      return res
        .status(401)
        .send({
          result: FAILED,
          message: NOT_AUTHORIZED
        });
    }

    const productFilter = { _id: product._id };
    const productUpdate = { onSale: false };

    const updatedProduct = await Product.findOneAndUpdate(productFilter, productUpdate, { new: true });

    const latestBid = product.history.length > 0
      ? product.history[product.history.length - 1]
      : null;

    const buyerFilter = { _id: latestBid.bider._id };
    const buyerUpdate = {
      point: user.point - latestBid.bidPrice,
      $push: {
        shoppingList: productId,
        pointHistory: {
          title: `${product.title.substring(0, 8).trim()}... 구매`,
          price: latestBid.bidPrice,
          balance: user.point - latestBid.bidPrice,
          createdAt: Date.now(),
        }
      }
    };

    await User.findOneAndUpdate(buyerFilter, buyerUpdate);

    const sellerFilter = { _id: product.seller._id };
    const sellerUpdate = {
      point: user.point + latestBid.bidPrice,
      $push: {
        salesList: productId,
        pointHistory: {
          title: `${product.title.substring(0, 8).trim()}... 판매`,
          price: latestBid.bidPrice,
          balance: user.point + latestBid.bidPrice,
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

module.exports = closeBid;
