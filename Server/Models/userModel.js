const express = require("express")
const database = require("../Config/DBconnection")
const { DataTypes } = require("sequelize")

exports.userModel = new database.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM('employer', "admin", "super-admin"),
        allowNull: false,
        defaultValue: "employer"
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "company",
            key: "id"
        }
    },

    confirmPassword :{
        type: DataTypes.STRING,
        allowNull: false
    },
    newPassword : {
        type : DataTypes.STRING,
        allowNull: false

    },
 otp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    otpExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},
    {
        timestamps: true
    })