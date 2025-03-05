const sequelize = require("../Config/DBconnection");
const { DataTypes } = require("sequelize");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_KEY;
const iv = crypto.randomBytes(16);

// Encryption function
const encrypt = (text) => {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

// Decryption function
const decrypt = (text) => {
  let textParts = text.split(":"),
    iv = Buffer.from(textParts.shift(), "hex"),
    encryptedText = Buffer.from(textParts.join(""), "hex"),
    decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv),
    decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("email", encrypt(value));
      },
      get() {
        return decrypt(this.getDataValue("email"));
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Employee", "Admin", "Super Admin"),
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue("otp", bcrypt.hashSync(value, 10));
      },
    },
    otpExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue("phone_number", encrypt(value));
      },
      get() {
        return decrypt(this.getDataValue("phone_number"));
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
