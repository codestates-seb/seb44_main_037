const axios = require("axios");

async function getUserEmail(req, res, next) {
  try {
    const accessToken = req.accessToken;
    const userDataResult = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      params: { access_token: accessToken },
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    req.email = userDataResult.data.email;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ message: "구글로부터 유저 데이터를 받아오는 과정에서 문제가 생겼습니다." });
  }
}

module.exports = getUserEmail
