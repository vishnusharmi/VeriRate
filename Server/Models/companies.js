const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconnection");
const User = require("./user");
const { encrypt, decrypt } = require('../utils/cryptoUtils');

const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    set(value) {
      this.setDataValue("companyName", encrypt(value));
    },
    get() {
      return decrypt(this.getDataValue("companyName"));
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(value) {
      this.setDataValue("email", encrypt(value));
    },
    get() {
      return decrypt(this.getDataValue("email"));
    },
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: true,
    set(value) {
      this.setDataValue("phonenumber", encrypt(value));
    },
    get() {
      return decrypt(this.getDataValue("phonenumber"));
    },
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
    set(value) {
      this.setDataValue("address", encrypt(value));
    },
    get() {
      return decrypt(this.getDataValue("address"));
    },
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true,
    set(value) {
      this.setDataValue("industry", encrypt(value));
    },
    get() {
      return decrypt(this.getDataValue("industry"));
    },
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registerNum: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("registerNum", encrypt(value));
    },
    get() {
      return decrypt(this.getDataValue("registerNum"));
    },
  },
  founderYear: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("founderYear", encrypt(value));
    },
    get() {
      return decrypt(this.getDataValue("founderYear"));
    },
  },
  companyWebsite: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("companyWebsite", encrypt(value));
    },
    get() {
      return decrypt(this.getDataValue("companyWebsite"));
    },
  },
});

module.exports = Company;
