const sequelize = require("../Config/DBconnection");
const {DataTypes}=require("sequelize");
const User = require("./user");

const allDocuments = sequelize.define("Documents",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    empId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    compId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      onDelete: "CASCADE",
    },
    documentType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true }
);

module.exports= allDocuments