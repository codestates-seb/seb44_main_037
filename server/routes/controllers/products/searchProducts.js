const { OK, INVALID_ID } = require("../../../constants/messages");
const Product = require("../../../models/Product");

async function searchProducts(req, res, next) {
  const keyword = req.params.keyword;
  let result;

  try {
    result = await Product
      .find({ $text: { $search: keyword } }, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } });

    if (result.length === 0) {
      result = await Product.find({ title: { $regex: keyword } });
    }

    const isInvalid = result === null;

    if (isInvalid) {
      throw createError(404, INVALID_ID);
    }

    res
      .status(200)
      .send({ result: OK, payload: { products: result } });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: error });
  }
}

module.exports = searchProducts;
