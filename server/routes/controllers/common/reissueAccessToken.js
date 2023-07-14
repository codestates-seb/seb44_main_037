const { verifyToken, generateToken } = require("../helper/authFunctions");
const { NOT_AUTHORIZED, INVALID_USER, OK } = require("../../../constants/messages");
const cookieOptions = require("../../../constants/cookieOptions");

const User = require("../../../models/User");

async function reissueAccessToken(req, res, next) {
  const { refreshToken } = req.cookies;

  const refreshPayload = verifyToken("refresh", refreshToken);

  if (refreshPayload) {
    const user = await User.findOne({ _id: refreshPayload.id });

    if (!user) {
      res.clearCookie("refreshToken", cookieOptions);
      res.status(401).send(INVALID_USER);
      return;
    }

    const { accessToken } = generateToken(user);

    return res
      .status(200)
      .header("token", accessToken)
      .send({ result: OK, payload: { user } });
  }

  res.clearCookie("token", cookieOptions);
  res.status(401).send(NOT_AUTHORIZED);
  return;
}

module.exports = reissueAccessToken;
