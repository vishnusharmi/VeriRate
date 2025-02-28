const { DataTypes } = require("sequelize");
const database = require("../Config/DBconnection");
const Company = require("../Models/companies");
const User = require("./user");

const Employee = database.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Company,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    // email: {
    //   type: DataTypes.STRING(255),
    //   allowNull: true,
    //   unique: true,
    // },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    employment_history: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      onUpdate: DataTypes.NOW,
    },
    position:{
      type: DataTypes.STRING(50),
      allowNull: false,
    },
   
  },

  {
    tableName: "employees",
    timestamps: false,
  }
);

module.exports = Employee;
