const { INVALID_REQUEST, OK, NOT_AUTHORIZED } = require("../../../constants/messages");
const { upload } = require("../helper/s3Functions");
const Product = require("../../../models/Product");
const { GENERAL, AUCTION } = require("../../../constants/products");
const schedule = require("node-schedule");
const User = require("../../../models/User");

async function register(req, res, next) {
  const now = Date.now();
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
      return res
        .status(400)
        .send({
          result: FAILED,
          message: INVALID_REQUEST
        });
    }

    if (String(req.user._id) !== userId) {
      return res
        .status(401)
        .send({
          result: FAILED,
          message: NOT_AUTHORIZED
        });
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
      isOnSale: true,
      bidInfo: {
        instantBidPrice: Number(instantBidPrice),
        startPrice: Number(startPrice),
        bidUnit: Number(bidUnit),
        deadline: now + (Number(deadline) * 3600000),
      },
      createdAt: now
    });

    if (saleType === AUCTION) {
      const end = new Date(createdProduct.bidInfo.deadline);

      schedule.scheduleJob(end, async () => {
        const product = await Product
          .findOneAndUpdate({ _id: createdProduct._id }, { isOnSale: false }, { new: true })
          .populate(["seller", "history.bider"]);

        if (product.history.length === 0) return;

        const latestBid = product.history[product.history.length - 1];

        const productFilter = { _id: product._id };
        const productUpdate = { buyer: latestBid.bider._id };

        const updatedProduct = await Product
          .findOneAndUpdate(productFilter, productUpdate, { new: true })
          .populate(["seller", "buyer", "history.bider"]);

        const buyerFilter = { _id: updatedProduct.buyer._id };
        const buyerUpdate = {
          point: updatedProduct.buyer.point - latestBid.bidPrice,
          $push: {
            shoppingList: product._id,
            pointHistory: {
              title: `${product.title.substring(0, 8).trim()}... 구매`,
              price: latestBid.bidPrice,
              balance: updatedProduct.buyer.point - latestBid.bidPrice,
              createdAt: now,
            }
          }
        };

        await User.findOneAndUpdate(buyerFilter, buyerUpdate);

        const sellerFilter = { _id: product.seller._id };
        const sellerUpdate = {
          point: product.seller.point + latestBid.bidPrice,
          $push: {
            salesList: product._id,
            pointHistory: {
              title: `${product.title.substring(0, 8).trim()}... 판매`,
              price: latestBid.bidPrice,
              balance: product.seller.point + latestBid.bidPrice,
              createdAt: now,
            }
          }
        };

        await User.findOneAndUpdate(sellerFilter, sellerUpdate);

        const io = req.app.get("io");
        io.of("/auction").to(String(product._id)).emit("auctionClose", updatedProduct);
      });
    }

    return res
      .status(201)
      .send({
        result: OK,
        payload: { productId: createdProduct._id }
      });
  } catch (error) {
    if (error.status) {
      next(error);
    }

    next({ message: error });
  }
}

module.exports = register;
