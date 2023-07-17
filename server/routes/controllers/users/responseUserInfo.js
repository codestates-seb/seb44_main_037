const { OK } = require("../../../constants/messages");

async function responseUserInfo(req, res, next) {
  const user = req.user;

  return res
    .status(200)
    .send({
      result: OK,
      payload: { user }
    });
}

module.exports = responseUserInfo;
