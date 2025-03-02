const userModel = require('../Models/user');
const Documents = require('../Models/documents');
const Company = require("../Models/companies");
const BlackList = require("../Models/blackList-model");
const Rating = require('../Models/ratingsModel');
const Employee = require('../Models/EmployeeModel');

const  Associations =()=>{
//     userModel.hasOne(Documents, { foreignKey: 'empId' });
// Documents.belongsTo(userModel, { foreignKey: 'empId' });

// user to employee relation 
userModel.hasOne(Employee, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "employee",
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
userModel.hasMany(Documents, {
  foreignKey: "empId",
  onDelete: "CASCADE",
  as: "documents",
});
Documents.belongsTo(userModel, {
  foreignKey: "empId",
  onDelete: "CASCADE",
   as: "user",
});


// company to employee relation
  Company.hasMany(Employee, { foreignKey: "company_id", onDelete: "CASCADE" });
  Employee.belongsTo(Company, {
    foreignKey: "company_id",
    onDelete: "CASCADE",
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



  Employee.belongsTo(Company, { foreignKey: "company_id" });
  Employee.belongsTo(userModel, { foreignKey: "userId" });
  Company.hasMany(Employee, { foreignKey: "company_id" });
  userModel.hasMany(Employee, { foreignKey: "userId" });

//ratings
Employee.hasMany(Rating, { foreignKey: 'employee_id' });
Rating.belongsTo(Employee, { foreignKey: 'employee_id' });
}



module.exports = Associations;