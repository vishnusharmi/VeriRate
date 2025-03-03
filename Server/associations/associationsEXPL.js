const userModel = require("../Models/user");
const Documents = require("../Models/documents");
const Employee = require("../Models/EmployeeModel");
const Company = require("../Models/companies");
const BlackList = require("../Models/blackList-model");
const Rating = require("../Models/ratingsModel");
// const Employee = require('../Models/EmployeeModel');

const Associations = () => {
  //     userModel.hasOne(Documents, { foreignKey: 'empId' });
  // Documents.belongsTo(userModel, { foreignKey: 'empId' });

  // Employee.belongsTo(Company, {
  //   foreignKey: "company_id",
  //   onDelete: "CASCADE",
  // });

  Company.hasMany(Employee, {
    foreignKey: "company_id",
  });

  BlackList.belongsTo(Employee, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
  });

  BlackList.belongsTo(Company, {
    foreignKey: "company_id",
    onDelete: "CASCADE",
  });

  Employee.hasMany(BlackList, {
    foreignKey: "employee_id",
  });

  Company.hasMany(BlackList, {
    foreignKey: "company_id",
  });

  userModel.hasOne(Employee, { foreignKey: "userId", as: "employee" });
  Employee.belongsTo(userModel, { foreignKey: "userId", as: "user" });

  userModel.hasOne(Company, { foreignKey: "userId", as: "company" });
  Company.belongsTo(userModel, { foreignKey: "userId", as: "user" });

  Company.hasMany(Employee, {
    foreignKey: "company_id",
    as: "employees",
  });
  Employee.belongsTo(Company, {
    foreignKey: "company_id",
    as: "company",
  });

  userModel.hasMany(Documents, { foreignKey: "empId", as: "documents" });
  Documents.belongsTo(userModel, { foreignKey: "empId", as: "user" });

  //ratings
  Employee.hasMany(Rating, { foreignKey: "employee_id" });
  Rating.belongsTo(Employee, { foreignKey: "employee_id" });
};

module.exports = Associations;
