const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconnection");

const Auditlogs = sequelize.define("Auditlogs", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    action: {
        type: DataTypes.ENUM("CREATE", "UPDATE", "DELETE", "BLACKLIST", "VERIFY", "RATE"),
        allowNull: false
    },
    entityType: {
        type: DataTypes.ENUM("EMPLOYEE", "EMPLOYER", "ADMIN"),
        allowNull: false
    },    
    entityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    performedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    details: {
        type: DataTypes.JSON,
        allowNull: true
    },
    ipAddress: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Auditlogs;

// If an employee profile is updated, entityId would be the id of that employee.
// If an employer account is blacklisted, entityId would be the employer’s id.
// It basically ties the audit log to a specific employee, employer, or admin.
