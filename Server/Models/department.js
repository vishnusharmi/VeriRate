const { DataTypes } = require("sequelize");
const sequelize = require("../Config/DBconnection");
const companyTable = require('../Models/companies')
const { encrypt, decrypt } = require("../utils/cryptoUtils");

const Department = sequelize.define(
    "department",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("name", encrypt(value));
            },
            get() {
                return decrypt(this.getDataValue("name"));
            },
        },

        departmentCode: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("departmentCode", encrypt(value));
            },
            get() {
                return decrypt(this.getDataValue("departmentCode"));
            },
        },

        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: companyTable,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Department;