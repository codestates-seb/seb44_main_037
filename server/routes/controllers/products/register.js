const { INVALID_REQUEST, UNEXPECTED_ERROR, NO_AUTHORITY_TO_ACCESS, OK } = require("../../../constants/messages");
const { upload } = require("../helper/s3Functions");
const Product = require("../../../models/Product");
const { GENERAL, AUCTION } = require("../../../constants/products");

async function register(req, res, next) {
  const {
    userId,
    title,
    description,
    price,
    instantBidPrice,
    startPrice,
    bidUnit,
    saleType,
    category,
    deadline
  } = req.body;


  try {
    function checkIsInvalid() {
      let isInvalid = !title || !description || !saleType || !category;

      if (saleType === GENERAL) {
        isInvalid = isInvalid || !price;
      }

      if (saleType === AUCTION) {
        isInvalid = isInvalid || !instantBidPrice || !startPrice || !bidUnit;
      }

      return isInvalid;
    }

    const isInvalid = checkIsInvalid();

    if (isInvalid) {
      throw createError(422, INVALID_REQUEST);
    }

    if (String(req.user._id) !== userId) {
      throw createError(403, NO_AUTHORITY_TO_ACCESS);
    }

    const promiseList = await req.files.map(async (file) => {
      const result = await upload(file);
      return result.Location;
    });

    const s3Locations = await Promise.all(promiseList);

    const createdProduct = await Product.create({
      seller: userId,
      category,
      images: s3Locations,
      title,
      description,
      saleType,
      price: Number(price),
      history: [],
      bidInfo: {
        instantBidPrice: Number(instantBidPrice),
        startPrice: Number(startPrice),
        bidUnit: Number(bidUnit),
        deadline: Date.now() + (Number(deadline) * 3600000),
      },
      createdAt: Date.now()
    });

    return res
      .status(201)
      .send({ result: OK, productId: createdProduct._id });
  } catch (error) {
    if (error.status) {
      next(error);
    }

    next({ message: UNEXPECTED_ERROR });
  }
}

module.exports = register;
