require("dotenv").config();

module.exports = {
  CLIENT_URL: process.env.CLIENT_URL,
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  ACCESS_SECRET:process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  S3_BUCKET_NAME:process.env.S3_BUCKET_NAME,
  S3_REGION:process.env.S3_REGION,
  S3_ACCESS_KEY_ID:process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY:process.env.S3_SECRET_ACCESS_KEY,
  CHARGE_SECRET:process.env.CHARGE_SECRET
};
