const { CHARGE_SECRET } = require("../../../config/envConfig");
const { INVALID_REQUEST, OK, FAILED, CLOSED_ORDER } = require("../../../constants/messages");

const User = require("../../../models/User");

async function chargePoint(req, res, next) {
  const { price, chargeId, chargeSecret } = req.body;
  const user = req.user;

  try {
    if (!price || !chargeId) {
      return res
        .status(400)
        .send({
          result: FAILED,
          message: INVALID_REQUEST
        });
    }

    if (chargeSecret !== CHARGE_SECRET) {
      return res
        .status(400)
        .send({
          result: FAILED,
          message: INVALID_REQUEST
        });
    }

    const sameOrders = await User.find({ pointHistory: { "$elemMatch": { chargeId } } });

    if (sameOrders.length > 0) {
      return res
        .status(400)
        .send({
          result: FAILED,
          message: CLOSED_ORDER
        });
    }

    const filter = { _id: user._id };
    const update = {
      point: user.point + price,
      $push: {
        pointHistory: {
          title: "포인트 충전",
          price: price,
          balance: user.point + price,
          createdAt: Date.now(),
          chargeId
        }
      }
    };

    const updatedUser = await User.findOneAndUpdate(filter, update, { new: true });

    return res
      .status(200)
      .send({
        result: OK,
        payload: { user: updatedUser }
      });
  } catch (error) {
    if (error.status) {
      next(error);
    }

    next({ message: error });
  }
}

module.exports = chargePoint;
