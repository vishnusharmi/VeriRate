const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // 32-byte key
const iv = Buffer.from(process.env.IV_KEY, "hex"); // 16-byte IV

if (key.length !== 32) throw new Error("Invalid ENCRYPTION_KEY length");
if (iv.length !== 16) throw new Error("Invalid IV_KEY length");

exports.encrypt = (text) => {
  if (!text) return null;
  try {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.error("Encryption failed:", error.message);
    return null;
  }
};

exports.decrypt = (text) => {
  if (!text) return null;
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error.message);
    return null;
  }
};
