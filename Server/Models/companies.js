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
  // status: {
  //   type: DataTypes.ENUM("Active", "Pending Approval", "Suspended"),
  //   allowNull: true,
  // },
  phonenumber:{
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  // compliance: {
  //   type: DataTypes.ENUM("Compliant", "Under Review", "Non-Compliant"),
  //   allowNull: true,
  // },
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
  createdBy:{
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  country:{
    type: DataTypes.STRING,
    allowNull:false
  },
  state:{
    type: DataTypes.STRING,
    allowNull:false
  },
  registerNum :{
    type: DataTypes.STRING,
    allowNull:false
  },
  founderYear:{
    type:DataTypes.STRING,
    allowNull:false
  },
  companyWebsite:{
    type:DataTypes.STRING,
    allowNull:false
  },
 

});


module.exports = Company;



