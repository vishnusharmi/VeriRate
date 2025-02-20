const { DataTypes } = require("sequelize");
const database = require("../Config/DBconnection");

const blackList = database.define(
  "BlackList",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //   references: {
      //     model: 'employeeTable',    // foreign key - employee table
      //     key: 'id',
      //   },
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //   references: {
      //     model: 'companyTable',      // foreign key - company table
      //     key: 'id',
      //   },
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
