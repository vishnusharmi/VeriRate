const {config} = require("dotenv");
const cloudinary = require("cloudinary").v2

config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRATE_KEY,
});

module.exports = cloudinary;