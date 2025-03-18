const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconnection.js");
const User = require("./user.js");
const Company = require("../Models/companies.js");

const Activity = sequelize.define(
  "Activity",
  {
    id: {
      type: DataTypes.INTEGER, // Auto-incrementing integer
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING, // Changed to STRING
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING, // Changed to STRING
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER, // Changed to INTEGER
      allowNull: false,
      // references: {
      //   model: User,
      //   key: "id",
      // },
    },
    companyId: {
      type: DataTypes.INTEGER, // Changed to INTEGER
      allowNull: true,
      // references: {
      //   model: Company,
      //   key: "id",
      // },
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    entityId: {
      type: DataTypes.INTEGER, // Changed to INTEGER
      allowNull: true,
    },
    details: {
      type: DataTypes.STRING,
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"), // Kept as ENUM for priority
      defaultValue: "medium",
    },
  },
  {
    indexes: [
      { fields: ["companyId", "timestamp"] }, // Index for filtering by company and timestamp
      { fields: ["companyId", "type", "timestamp"] }, // Index for filtering by type and timestamp
      { fields: ["entityId", "type"] }, // Index for filtering by entity and type
    ],
  }
);

module.exports = Activity;
