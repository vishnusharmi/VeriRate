const userModel = require('../Models/user');
const Documents = require('../Models/documents');
const Rating = require('../Models/ratingsModel');
const Employee = require('../Models/EmployeeModel');

const  Associations =()=>{
    userModel.hasOne(Documents, { foreignKey: 'empId' });
Documents.belongsTo(userModel, { foreignKey: 'empId' });

//ratings
Employee.hasMany(Rating, { foreignKey: 'employee_id' });
Rating.belongsTo(Employee, { foreignKey: 'employee_id' });
}

module.exports = Associations;