
const sequelize = require("../Config/DBconnection");
const { DataTypes } = require("sequelize")

const  User=  sequelize.define('User', {
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
        type: DataTypes.ENUM('employee', "admin", "super-admin"),
        allowNull: false,
    },
    // company_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     references: {
    //         model: "company",
    //         key: "id"
    //     }
    // },

    confirmPassword :{
        type: DataTypes.STRING,
        allowNull: true
    },
    newPassword : {
        type : DataTypes.STRING,
        allowNull: true

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
    });


    module.exports=User;