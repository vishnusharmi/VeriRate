const userModel = require('../Models/user');
const Documents = require('../Models/documents');

const  Associations =()=>{
    userModel.hasOne(Documents, { foreignKey: 'empId' });
Documents.belongsTo(userModel, { foreignKey: 'empId' });
}

module.exports = Associations;