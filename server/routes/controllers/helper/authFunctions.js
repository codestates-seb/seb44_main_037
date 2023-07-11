require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const { ACCESS_SECRET, REFRESH_SECRET } = require("../../../config/envConfig");

const User = require("../../../models/User");

module.exports = {
  verifyUserData: async (email) => {

    const user = await User.findOne({ email: email });

    if (user) {
      return user;
    }

    return null;
  },
  generateToken: (user, isLogin) => {
    const payload = {
      id: user._id,
      email: user.email,
    };

    let result = {
      accessToken: sign(payload, ACCESS_SECRET, {
        expiresIn: "1h",
      }),
    };

    if (isLogin) {
      result.refreshToken = sign(payload, REFRESH_SECRET, {
        expiresIn: "7d",
      });
    }

    return result;
  },
  verifyToken: (type, token) => {
    let secretKey, decoded;
    switch (type) {
      case "access":
        secretKey = ACCESS_SECRET;
        break;
      case "refresh":
        secretKey = REFRESH_SECRET;
        break;
      default:
        return null;
    }

    try {
      decoded = verify(token, secretKey);
    } catch (err) {
      console.log(`JWT Error: ${err.message}`);
      console.log(`JWT Error: ${err.name}`);
      return null;
    }
    return decoded;
  },
};
