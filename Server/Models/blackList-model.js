const { DataTypes } = require("sequelize");
const database = require("../Config/DBconnection");
const employeeTable = require("../Models/EmployeeModel");
const companyTable = require("../Models/companies");
const userTable = require("./user");
const { encrypt, decrypt } = require("../utils/cryptoUtils");

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
      set(value) {
        this.setDataValue("fullname", encrypt(value));
      },
      get() {
        const value = this.getDataValue("fullname");
        
        
        if (!value) return null;
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("email", encrypt(value));
      },
      get() {
        const value = this.getDataValue("email");
        return value ? decrypt(value) : null;
      },
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue("contact_number", encrypt(value));
      },
      get() {
        const value = this.getDataValue("contact_number");
        return value ? decrypt(value) : null;
      },
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue("position", encrypt(value));
      },
      get() {
        const value = this.getDataValue("position");
        return value ? decrypt(value) : null;
      },
    },
    reason_for_blacklist: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue("reason_for_blacklist", encrypt(value));
      },
      get() {
        const value = this.getDataValue("reason_for_blacklist");
        return value ? decrypt(value) : null;
      },
    },
    // blackList_date: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    report_by: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue("report_by", encrypt(value));
      },
      get() {
        const value = this.getDataValue("report_by");
        return value ? decrypt(value) : null;
      },
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
      set(value) {
        this.setDataValue("company_name", encrypt(value));
      },
      get() {
        const value = this.getDataValue("company_name");
        return value ? decrypt(value) : null;
      },
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
