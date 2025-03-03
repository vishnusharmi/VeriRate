const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DBconnection');
const Employees = require('../Models/EmployeeModel');
const userTable = require("./user")

const Ratings = sequelize.define(
  "Ratings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employees,
        key: "id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: userTable,
        key: "id",
      },
    },
    feedback: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Ratings;