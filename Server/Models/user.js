const sequelize = require("../Config/DBconnection");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const crypto = require("../utils/cryptoUtils");

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
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Employee", "Employee Admin", "Super Admin"),
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        if(value){
        this.setDataValue("otp", bcrypt.hashSync(value, 10));
      }else{
        this.setDataValue("otp", value);
      }
    },
    },
    otpExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
