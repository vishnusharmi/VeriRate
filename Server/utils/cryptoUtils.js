const crypto = require("crypto");
require("dotenv").config();

const algorithm = "aes-256-cbc";
const key = Buffer.from("iuhnceuwbevqwoeidnugfeucfnwh", "hex"); // 32-byte key
const iv = Buffer.from("skwceoihmencoreci", "hex"); // 16-byte IV

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

exports.decrypt = (text) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
