const { DataTypes } = require("sequelize");
const database = require("../Config/DBconnection");
const employeeTable = require('./EmployeeModel')
const companyTable = require('./companies')
const userTable = require("./user");

const blackList = database.define(
  "BlackList",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason_for_blacklist: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // blackList_date: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    report_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: employeeTable,
        key: "id",
      },
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: companyTable,
        key: "id",
      },
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Temporary", "Permanent"),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: userTable,
        key: "id",
      },
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = blackList;
