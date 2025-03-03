const userModel = require('../Models/user');
const Documents = require('../Models/documents');
const Company = require("../Models/companies");
const BlackList = require("../Models/blackList-model");
const Rating = require('../Models/ratingsModel');
const Employee = require('../Models/EmployeeModel');
const Disputes =require("../Models/disputes");
const blackList = require('../Models/blackList-model');


const  Associations =()=>{

  // user to employee relation
  userModel.hasOne(Employee, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  Employee.belongsTo(userModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "user",
  });

  userModel.hasMany(Employee, {
    foreignKey: "createdBy",
    onDelete: "CASCADE",
    as: "employee",
  });
  Employee.belongsTo(userModel, {
    foreignKey: "createdBy",
    onDelete: "CASCADE",
    as: "user",
  });

  // user to documents relation
  Employee.hasMany(Documents, {
    foreignKey: "empId",
    onDelete: "CASCADE",
    as: "documents",
  });
  Documents.belongsTo(Employee, {
    foreignKey: "empId",
    onDelete: "CASCADE",
    as: "employee",
  });

  // company to employee relation
  Company.hasMany(Employee, { foreignKey: "company_id", onDelete: "CASCADE" });
  Employee.belongsTo(Company, {
    foreignKey: "company_id",
    onDelete: "CASCADE",
  });

  // employee to disputes relation
  // Employee has many disputes
  Employee.hasMany(Disputes, {
    foreignKey: "employee_id",
    as: "disputes",
    onDelete: "CASCADE",
  });

  Disputes.belongsTo(Employee, {
    foreignKey: "employee_id",
    as: "employee",
    onDelete: "CASCADE",
  });

  // User (Admin) can create multiple disputes
  userModel.hasMany(Disputes, {
    foreignKey: "created_by",
    as: "createdDisputes",
    onDelete: "CASCADE",
  });

  Disputes.belongsTo(userModel, {
    foreignKey: "created_by",
    as: "createdBy",
    onDelete: "CASCADE",
  });

  // Employee-Blacklist Relationship

  Employee.hasMany(blackList, {
    foreignKey: "employee_id",
    as: "blacklistEntries",
    onDelete: "CASCADE",
  });

  blackList.belongsTo(Employee, {
    foreignKey: "employee_id",
    as: "employee",
  });
  Company.hasMany(blackList, {
    foreignKey: "company_id",
    as: "blacklistRecords",
    onDelete: "CASCADE",
  });

  blackList.belongsTo(Company, {
    foreignKey: "company_id",
    as: "company",
  });

  // One Admin (User) can create multiple Blacklist entries
  userModel.hasMany(BlackList, {
    foreignKey: "created_by",
    as: "blacklistedByAdmin",
  });
  BlackList.belongsTo(userModel, {
    foreignKey: "created_by",
  });



  //ratings
  Employee.hasMany(Rating, { foreignKey: "employee_id" });
  Rating.belongsTo(Employee, { foreignKey: "employee_id" });

    userModel.hasMany(Rating, {
      foreignKey: "created_by",
    });
    Rating.belongsTo(userModel, {
      foreignKey: "created_by",
    });

}



module.exports = Associations;