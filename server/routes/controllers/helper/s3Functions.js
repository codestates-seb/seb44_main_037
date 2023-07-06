require("dotenv").config();

const fs = require("fs");
const AWS = require("aws-sdk");
const multer = require("multer");

const {
  S3_BUCKET_NAME,
  S3_REGION,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY
} = require("../../../config/envConfig");

AWS.config.update({
  region: S3_REGION,
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY
})

const s3 = new AWS.S3();

module.exports = {
  upload: async (file) => {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: S3_BUCKET_NAME,
      Body: fileStream,
      Key: file.filename
    };

    return s3.upload(uploadParams).promise();
  },
  multerUpload: multer({
    dest: "uploads/",
    limits: { fileSize: 0.5 * 1024 * 1024 }
  })
};
