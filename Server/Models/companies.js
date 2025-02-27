const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconnection");
const User = require("./user");


const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email :{
    type : DataTypes.STRING,
    allowNull : false,
    unique : true,
  },
  status: {
    type: DataTypes.ENUM("Active", "Pending Approval", "Suspended"),
    allowNull: false,
  },
  phonenumber:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  compliance: {
    type: DataTypes.ENUM("Compliant", "Under Review", "Non-Compliant"),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});


module.exports = Company;



