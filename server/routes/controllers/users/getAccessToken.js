const axios = require("axios");
const { CLIENT_ID, CLIENT_SECRET } = require("../../../config/envConfig");

async function getAccessToken(req, res, next) {
  try {
    const result = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: req.body.authorizationCode,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000"
    });

    // access_token, expires_in, id_token, scope, token_type이 포함됨
    const accessToken = result.data.access_token;
    req.accessToken = accessToken;

    next();
  } catch (err) {
    return res
      .status(401)
      .send({ message: "구글로부터 액세스 토큰을 받아오는 과정에서 문제가 생겼습니다." });
  }
};

module.exports = getAccessToken;
