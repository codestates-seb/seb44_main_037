const { verifyToken, generateToken } = require("../helper/authFunctions");
const { NOT_AUTHORIZED } = require("../../../constants/messages");
const cookieOptions = require("../../../constants/cookieOptions");

const User = require("../../../models/User");

async function checkUserInfo(req, res, next) {
  const { access_jwt, refresh_jwt } = req.cookies;

  const accessPayload = verifyToken("access", access_jwt);
  const refreshPayload = verifyToken("refresh", refresh_jwt);

  if (accessPayload) {
    const user = await User.findOne({ _id: accessPayload.id });

    if (!user) {
      return res.status(401).send(NOT_AUTHORIZED);
    }

    req.user = user;

    return next();
  }

  if (refreshPayload) {
    const user = await User.findOne({ _id: refreshPayload.id });

    if (!user) {
      return res.status(401).send(NOT_AUTHORIZED);
    }

    const { accessToken } = generateToken(user);

    res.cookie("access_jwt", accessToken, cookieOptions);
    req.user = user;

    return next();
  }

  return res.status(401).send(NOT_AUTHORIZED);
}

module.exports = checkUserInfo;
