const blackListServices = require('../Services/blackList-services')

//create
const createBlackListUser = async (req, res) => {
    try {
        const user = await blackListServices.createBlackList(req.body)
        return res.status(200).json({ message: " User created succesfully", user });
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
    try {
        const users = await blackListServices.readAllBlackList();
        console.log(users);

        return res.status(200).json({ message: "Data retrived successfully", data: users })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

//update
const updateBlackListUser = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const upUser = await blackListServices.updateBlackList(id, data);
        return res.status(200).json({ message: "Data updated successfully", data })
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
        const delUser = await blackListServices.deleteBlackList(id);
        return res.status(200).json({ message: "User deleted successfully", delUser })
    } catch (error) {
        console.error("Error Message: ", error.message);
        return res.status(404).json({ message: error.message })
    }
}
module.exports = { createBlackListUser, readBlackListUser, readAllBlackListUser, updateBlackListUser, deleteBlackListUser };
