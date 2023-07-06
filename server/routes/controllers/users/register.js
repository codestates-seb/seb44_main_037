const { INVALID_REQUEST, UNEXPECTED_ERROR } = require("../../../constants/messages");
const { upload } = require("../helper/s3Functions");
const User = require("../../../models/User");

async function register(req, res, next) {
  const { email, nickname } = req.body;

  try {
    const isInvalid = (email === undefined) || (nickname === undefined);

    if (isInvalid) {
      throw createError(422, INVALID_REQUEST);
    }

    const s3Result = await upload(req.file);

    const user = await User.create({
      email: email,
      image: s3Result.Location,
      nickname: nickname,
      salesList: [],
      shoppingList: []
    });

    req.user = user;

    next();
  } catch (error) {
    if (error.status) {
      next(error);
    }

    next({ message: UNEXPECTED_ERROR });
  }
}

module.exports = register;
