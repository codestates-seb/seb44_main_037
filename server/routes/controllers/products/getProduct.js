const { UNEXPECTED_ERROR, OK, INVALID_ID } = require("../../../constants/messages");
const Product = require("../../../models/Product");

async function getProduct(req, res, next) {
  const productId = req.params.id;

  try {
    const product = await Product
      .findById(productId)
      .populate(["seller", "history.bider"]);

    const isInvalid = product === null;

    if (isInvalid) {
      throw createError(404, INVALID_ID);
    }

    res
      .status(200)
      .send({ result: OK, product });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
}

module.exports = getProduct;
