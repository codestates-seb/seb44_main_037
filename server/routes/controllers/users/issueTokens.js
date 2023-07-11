const cookieOptions = require("../../../constants/cookieOptions");
const { verifyUserData, generateToken } = require("../helper/authFunctions");
const { OK, FAILED } = require("../../../constants/messages");

async function issueTokens(req, res, next) {
  try {
    const user = req.user || await verifyUserData(req.email);

    if (!user) {
      return res
        .status(200)
        .send({ result: FAILED, email: req.email });
    }

    const token = generateToken(user, true);

    const expireOption = {
      expires: new Date(Date.now() + 24 * 3600 * 1000 * 7) // 7일
    };

    res.cookie('access_jwt', token.accessToken, cookieOptions);
    res.cookie('refresh_jwt', token.refreshToken, { ...cookieOptions, ...expireOption });

    return res
      .status(200)
      .send({
        result: OK,
        body: { user }
      });
  } catch (err) {
    return res
      .status(401)
      .send({ message: "토큰을 생성하는 과정에서 문제가 생겼습니다." });
  }
};

module.exports = issueTokens;
