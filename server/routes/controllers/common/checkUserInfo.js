const { verifyToken, generateToken } = require("../helper/authFunctions");
const { INVALID_USER, REFRESH_TOKEN_EXPIRED, FAILED } = require("../../../constants/messages");

const User = require("../../../models/User");

async function checkUserInfo(req, res, next) {
  const { authorization } = req.headers;
  const accessToken = authorization.split(" ")[1];
  const { refreshToken } = req.cookies;

  const accessPayload = verifyToken("access", accessToken);
  const refreshPayload = verifyToken("refresh", refreshToken);

  if (accessPayload) {
    const user = await User.findOne({ _id: accessPayload.id });

    if (!user) {
      return res
        .status(401)
        .send({
          result: FAILED,
          message: INVALID_USER
        });
    }

    req.user = user;

    return next();
  }

  if (refreshPayload) {
    const user = await User.findOne({ _id: refreshPayload.id });

    if (!user) {
      return res
        .status(401)
        .send({
          result: FAILED,
          message: INVALID_USER
        });
    }

    const { accessToken } = generateToken(user);

    res.header("accessToken", accessToken);
    req.user = user;

    return next();
  }

  return res
    .status(401)
    .send({
      result: FAILED,
      message: REFRESH_TOKEN_EXPIRED
    });
}

module.exports = checkUserInfo;
