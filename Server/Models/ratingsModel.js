const { DataTypes, Sequelize, DATE } = require('sequelize');
const sequelize = require('../Config/DBconnection');

const Ratings = sequelize.define("Ratings", {
    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: "Employees",
        //     key: "employee_id",
        // },
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    feedback: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    timestamps: false,
})
module.exports = Ratings;