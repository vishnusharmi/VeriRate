const blackListServices = require('../Services/blackList-services');

//create
const createBlackListUser = async (req, res) => {
    const adminId = req.userId;
    try {
        const response = await blackListServices.createBlackList(req.body, adminId);
        // need to write activity log
        return res.status(201).json({ message: "Employee has been blacklisted", response });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// get by ID
const readBlackListUser = async (req, res) => { 
    try {
        const user = await blackListServices.readBlackList(req.params.id);
        return res.status(200).json({ message: "Data retrived successfully", user })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
// get all users
const readAllBlackListUser = async (req, res) => {
    try {
        const users = await blackListServices.readAllBlackList();

        return res.status(200).json({ message: "Data retrived successfully", data: users })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

//update
const updateBlackListUser = async (req, res) => {
    const { id } = req.params
    const data = req.body
    const adminId = req.userId
    try {
        const response = await blackListServices.updateBlackList(id, data, adminId);
        return res.status(200).json({ message: "Data updated successfully", response })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

//delete 
const deleteBlackListUser = async (req, res) => {
    try {
        const { id } = req.params;
        const delUser = await blackListServices.deleteBlackList(id);
        return res.status(200).json({ message: "User deleted successfully", delUser })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
module.exports = { createBlackListUser, readBlackListUser, readAllBlackListUser, updateBlackListUser, deleteBlackListUser };
