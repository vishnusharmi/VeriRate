const bcrypt = require('bcryptjs')
const registerServices = require('../Services/user-service');
const { accessSync } = require('fs');
const { captureRejectionSymbol } = require('events');
require('dotenv').config();

const register = async (req, res) => {
    const data = req.body;
    const files = req.file;
    console.log(files, "controller");

    try {
        const respose = await registerServices.registerUser(data, files);
        //  console.log(data)
        res.status(201).json(respose)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await registerServices.getAllusers();
        console.log(users);

        return res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve users',
            error: error.message,
        });
    }
};


//get user by id
const getUserByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await registerServices.getUserbyid(id);

        if (!user) {
            return res.status(404).json({
                message: "user not found",
            })
        }


        return res.status(200).json({
            message: 'user retrived successfully',
            data: user,

        })

    } catch (error) {
        return res.status(500).json({
            message: " failed to retrive server"
        })
    }
}


// update user by id

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        console.log(data);

        const documentPath = req.file ? req.file.path : null;

        const updatedUser = await registerServices.updateUserById(id,data, documentPath);

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: " failed to update user", error: error.message })
    }
}



//delete user

const deleteUserById = async (req,res)=>{
    try{
        const userdeleted = await registerServices.deleteUser(req.params.id)
        res.status(200).json({message : ' user deleted succesfully', userdeleted})

    }
    catch(error){
        res.status(500).json({message : 'user not deleted'})
    }
}




module.exports = { register, getAllUsers, getUserByIdController, updateUserById, deleteUserById }