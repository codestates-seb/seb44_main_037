const { UNEXPECTED_ERROR, OK, INVALID_ID } = require("../../../constants/messages");
const { ALL_KO, ALL, FANZINE_KO, FANZINE, STUFF, STUFF_KO, DOLL_KO, DOLL, GENERAL_KO, GENERAL, AUCTION_KO, AUCTION, ONSALE_KO, NOT_ONSALE, NOT_ONSALE_KO } = require("../../../constants/products");
const Product = require("../../../models/Product");

async function getAllProducts(req, res, next) {
  const { category, type, status } = req.query;

  const changeKoreanToEnglish = (string) => {
    switch (true) {
      case string === ALL_KO:
        return ALL;

      case string === FANZINE_KO:
        return FANZINE;

      case string === STUFF_KO:
        return STUFF;

      case string === DOLL_KO:
        return DOLL;

      case string === GENERAL_KO:
        return GENERAL;

      case string === AUCTION_KO:
        return AUCTION;

      case string === ONSALE_KO:
        return true;

      case string === NOT_ONSALE_KO:
        return false;

      default:
        return null;
    }
  }

  try {
    const targets = {};

    category !== ALL_KO && (targets.category = changeKoreanToEnglish(category));
    type !== ALL_KO && (targets.saleType = changeKoreanToEnglish(type));
    status !== ALL_KO && (targets.isOnSale = changeKoreanToEnglish(status));

    const products = await Product.find(targets).populate(["seller"]);

    const isInvalid = products === null;

    if (isInvalid) {
      throw createError(404, INVALID_ID);
    }

    res
      .status(200)
      .send({ result: OK, payload: { products } });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
}

module.exports = getAllProducts;
