const userModel = require("../Models/user");
const Documents = require("../Models/documents");
const Company = require("../Models/companies");
const BlackList = require("../Models/blackList-model");
const Rating = require("../Models/ratingsModel");
const Disputes = require("../Models/disputes");
const Employee = require("../Models/EmployeeModel");
const AdminSettings = require("../Models/adminSettings");
const Department = require("../Models/department");
const UserTracking = require("../Models/UserTracking")
const Associations = () => {
  // user to employee relation
  userModel.hasOne(Employee, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  Employee.belongsTo(userModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  userModel.hasMany(Employee, {
    foreignKey: "created_by",
    onDelete: "CASCADE",
  });
  Employee.belongsTo(userModel, {
    foreignKey: "created_by",
    onDelete: "CASCADE",
  });

  // user to employee relation
  userModel.hasMany(Employee, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  Employee.belongsTo(userModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // user to documents relation
  userModel.hasMany(Documents, {
    foreignKey: "empId",
    onDelete: "CASCADE",
  });
  Employee.hasMany(Documents, {
    foreignKey: "empId",
    onDelete: "CASCADE",
  });
  Documents.belongsTo(Employee, {
    foreignKey: "empId",
    onDelete: "CASCADE",
  });

  userModel.hasMany(Documents, {
    foreignKey: "empId",
    onDelete: "CASCADE",
  });
  Documents.belongsTo(userModel, {
    foreignKey: "empId",
    onDelete: "CASCADE",
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
    onDelete: "CASCADE",
  });

  Disputes.belongsTo(Employee, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
  });

  // User (Admin) can create multiple disputes
  userModel.hasMany(Disputes, {
    foreignKey: "created_by",
    onDelete: "CASCADE",
  });

  Disputes.belongsTo(userModel, {
    foreignKey: "created_by",
    onDelete: "CASCADE",
  });

  // Employee-Blacklist Relationship

  Employee.hasMany(BlackList, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
  });

  BlackList.belongsTo(Employee, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
  });
  Company.hasMany(BlackList, {
    foreignKey: "company_id",
    onDelete: "CASCADE",
  });

  BlackList.belongsTo(Company, {
    foreignKey: "company_id",
    onDelete: "CASCADE",
  });

  // One Admin (User) can create multiple Blacklist entries
  userModel.hasMany(BlackList, {
    foreignKey: "created_by",
    onDelete: "CASCADE",
  });
  BlackList.belongsTo(userModel, {
    foreignKey: "created_by",
    onDelete: "CASCADE",
  });

  //ratings
  Employee.hasMany(Rating, { foreignKey: "employee_id" });
  Rating.belongsTo(Employee, { foreignKey: "employee_id" });

  //ratings
  Employee.hasMany(Rating, { foreignKey: "employee_id", onDelete: "CASCADE" });
  Rating.belongsTo(Employee, {
    foreignKey: "employee_id",
    onDelete: "CASCADE",
  });

  userModel.hasMany(Rating, {
    foreignKey: "created_by",
    onDelete: "CASCADE",
  });
  Rating.belongsTo(userModel, {
    foreignKey: "created_by",
    onDelete: "CASCADE",
  });

  //user to created_by of employee

  userModel.hasMany(Employee, {
    foreignKey: "created_by",
    onDelete: "CASCADE",
  });
  Employee.belongsTo(userModel, {
    foreignKey: "created_by",
    onDelete: "CASCADE",
  });

  Company.hasMany(Department, { foreignKey: "companyId", onDelete: "CASCADE" });
  Department.belongsTo(Company, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });

  //admin settings
  // userModel.hasOne(AdminSettings, {
  //   foreignKey: "adminId",
  //   onDelete: "CASCADE",
  // });
  // AdminSettings.belongsTo(userModel, {
  //   foreignKey: "adminId",
  //   onDelete: "CASCADE",
  // });

  //admin settings
  userModel.hasOne(AdminSettings, {
    foreignKey: "superAdminId",
    onDelete: "CASCADE",
  });

  AdminSettings.belongsTo(userModel, {
    foreignKey: "superAdminId",
    onDelete: "CASCADE",
  });

  userModel.hasOne(AdminSettings, {
    foreignKey: "adminId",
    onDelete: "CASCADE",
  });

  AdminSettings.belongsTo(userModel, {
    foreignKey: "adminId",
    onDelete: "CASCADE",
  });
  // end of admin settings

  Company.hasMany(Department, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });
  Department.belongsTo(Company, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
  });

  userModel.hasMany(Employee, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  Employee.belongsTo(userModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  userModel.hasOne(UserTracking, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  UserTracking.belongsTo(userModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });


};

module.exports = Associations;
