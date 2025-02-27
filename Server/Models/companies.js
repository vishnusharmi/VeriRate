const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconnection");


const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    primaryKey: true,
  },
  name: {
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
});

module.exports = Company;



