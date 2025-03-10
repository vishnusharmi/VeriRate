const Employee = require('../Models/EmployeeModel');
const blackListServices = require('../Services/blackList-services');
const { createAuditLog } = require('./audit-controller');

//create
const createBlackListUser = async (req, res) => {
    try {
        const response = await blackListServices.createBlackList(req.body)
        
        const userData = response;
        // console.log(response.data.user.dataValues)
        if (!userData) {
            return res.status(500).json({ message: "User registration unsuccessful" });
        }
        const action = "BLACKLIST";
        const entityType = "Employee Admin";
        const entityId = userData.created_by || "Not available";
        // performed by should contain the id of the performer which can be brought by decoding JWT token
        // here i mentioned userData.id just for now after implementing JWT authentication then change it
        const performedBy = userData.created_by;
        const details = `${userData.created_by} Blacklisted  ID: ${userData.employee_id} in ${userData.company_id} Company`;
        const ipAddress = req.ip || "0.0.0.0";
        const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });

        return res.status(200).json({ message: " User Blacklisted succesfully", response, auditResponse });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

// get
const readBlackListUser = async (req, res) => {
    console.log(req.params.id, 'iiiididididi');

    try {
        const user = await blackListServices.readBlackList(req.params.id);
        return res.status(200).json({ message: "Data retrived successfully", user })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
// get all users
const readAllBlackListUser = async (req, res) => {
    const {page,pageSize}=req.query;
    try {
        const users = await blackListServices.readAllBlackList(page,pageSize);
        console.log(users);

        res.status(200).json({message :"Blacklist users fetched successfully..." , data:users });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//update
const updateBlackListUser = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const response = await blackListServices.updateBlackList(id, data);
        const userData = await blackListServices.readBlackList(id);

        const action = "BLACKLIST";
        const entityType = "Employee Admin";
        const entityId = userData.created_by || "Not available";
        // performed by should contain the id of the performer which can be brought by decoding JWT token
        // here i mentioned userData.id just for now after implementing JWT authentication then change it
        const performedBy = userData.created_by;
        const details = `Updated BlockList ID: ${userData.employee_id} in Company ID:${userData.company_id} which is created by ${userData.created_by}`;
        const ipAddress = req.ip || "0.0.0.0";
        const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });


        return res.status(200).json({ message: "Data updated successfully", response,auditResponse })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

//delete 
const deleteBlackListUser = async (req, res) => {
    try {
        const { id } = req.params;
        // if (!id){
        //     return res.status(404).json({message : "Id not found"})
        // }

        const userData = await blackListServices.readBlackList(id);

        const action = "DELETE";
        const entityType = "Employee Admin";
        const entityId = userData.created_by || "Not available";
        // performed by should contain the id of the performer which can be brought by decoding JWT token
        // here i mentioned userData.id just for now after implementing JWT authentication then change it
        const performedBy = userData.created_by;
        const details = `Deleted BlockList ID: ${userData.employee_id} in Company ID:${userData.company_id} which is created by ${userData.created_by}`;
        const ipAddress = req.ip || "0.0.0.0";
        const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });

        

        const delUser = await blackListServices.deleteBlackList(id);
        return res.status(200).json({ message: "User deleted successfully", delUser,auditResponse })
    } catch (error) {
        console.error("Error Message: ", error.message);
        return res.status(404).json({ message: error.message })
    }
}
module.exports = { createBlackListUser, readBlackListUser, readAllBlackListUser, updateBlackListUser, deleteBlackListUser };
