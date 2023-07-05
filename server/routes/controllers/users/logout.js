const { OK } = require("../../../constants/messages");

async function logout(req, res, next) {
  const cookieOptions = {
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: true,
    httpOnly: true,
  };

  res.clearCookie('access_jwt', cookieOptions);
  res.clearCookie('refresh_jwt', cookieOptions);

  res.status(205).send({ result: OK });
}

module.exports = logout;
