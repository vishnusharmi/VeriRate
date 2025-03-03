const { DataTypes, JSONB } = require("sequelize");
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
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateOfJoin: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    panCard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aadharCard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankAccount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    IFSCcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_verified: {
      // type: DataTypes.BOOLEAN,
      // allowNull: true,
      type: DataTypes.ENUM("Pending", "Verified"),
      defaultValue: "Pending",
    },
    position:{
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    employment_history:{
      type: DataTypes.JSONB,
      allowNull:false
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
   
  },

  {
    tableName: "employees",
    timestamps: false,
  }
);


module.exports = Employee;
