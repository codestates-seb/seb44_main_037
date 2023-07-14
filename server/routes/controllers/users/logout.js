const cookieOptions = require("../../../constants/cookieOptions");
const { OK } = require("../../../constants/messages");

async function logout(req, res, next) {
  res.clearCookie("refreshToken", cookieOptions);
  res.status(200).send({ result: OK });
}

module.exports = logout;
