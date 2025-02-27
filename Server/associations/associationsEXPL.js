const userModel = require('../Models/user');
const Documents = require('../Models/documents');
const employeeModel = require("../Models/EmployeeModel")
const companyModel = require("../Models/companies");

const  Associations =()=>{
//     userModel.hasOne(Documents, { foreignKey: 'empId' });
// Documents.belongsTo(userModel, { foreignKey: 'empId' });


    userModel.hasOne(employeeModel, { foreignKey: "userId", as: "employee" });
    employeeModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });

    userModel.hasOne(companyModel, { foreignKey: "userId", as: "company" });
    companyModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });

    companyModel.hasMany(employeeModel, {
      foreignKey: "company_id",
      as: "employees",
    });
    employeeModel.belongsTo(companyModel, {
      foreignKey: "company_id",
      as: "company",
    });

    userModel.hasMany(Documents, { foreignKey: "empId", as: "documents" });
    Documents.belongsTo(userModel, { foreignKey: "empId", as: "user" });

}

module.exports = Associations;