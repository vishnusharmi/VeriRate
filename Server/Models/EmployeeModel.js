const { DataTypes } = require("sequelize");
const database = require("../Config/DBconnection");
const Company = require("../Models/companies");
const User = require("./user");
const crypto = require("../utils/cryptoUtils"); // Utility for encryption/decryption

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
      set(value) {
        this.setDataValue("first_name", crypto.encrypt(value));
      },
      get() {
        return crypto.decrypt(this.getDataValue("first_name"));
      },
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      set(value) {
        this.setDataValue("last_name", crypto.encrypt(value));
      },
      get() {
        return crypto.decrypt(this.getDataValue("last_name"));
      },
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
      set(value) {
        if (value) {
          this.setDataValue("phone_number", crypto.encrypt(value));
        }
      },
      get() {
        const encryptedValue = this.getDataValue("phone_number");
        return encryptedValue ? crypto.decrypt(encryptedValue) : null;
      },
    },
    employment_history: {
      type: DataTypes.JSON,
      allowNull: true,
      set(value) {
        if (value) {
          this.setDataValue(
            "employment_history",
            crypto.encrypt(JSON.stringify(value))
          );
        }
      },
      get() {
        const encryptedValue = this.getDataValue("employment_history");
        return encryptedValue
          ? JSON.parse(crypto.decrypt(encryptedValue))
          : null;
      },
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
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);

module.exports = Employee;
