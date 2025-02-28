const {DataTypes} = require('sequelize')
const sequelize = require('../Config/DBconnection')
const Employees = require('./EmployeeModel')
const User = require("./user");

const Disputes = sequelize.define('Disputes', {
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
        onDelete: "CASCADE"
    },
    dispute_type: {
        type: DataTypes.ENUM("blacklist", "rating", "other"),
        allowNull: false,
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "approved", "rejected", "info_requested"),
        defaultValue: "pending",
    },
    resolution_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    submitted_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    resolved_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: User, // Reference to Admins table
          key: "id",
        }, 
    },
    
});

module.exports = Disputes;