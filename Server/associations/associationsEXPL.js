const userModel = require('../Models/user');
const Documents = require('../Models/documents');
const Employee = require("../Models/EmployeeModel");
const Company = require("../Models/companies");
const BlackList = require("../Models/blackList-model");

const  Associations =()=>{
    userModel.hasOne(Documents, { foreignKey: 'empId' });
Documents.belongsTo(userModel, { foreignKey: 'empId' });

Employee.belongsTo(Company, {foreignKey: "company_id", onDelete: "CASCADE",});
  

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
}

module.exports = Associations;