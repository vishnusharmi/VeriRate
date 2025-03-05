const bcrypt = require('bcryptjs')
const registerServices = require('../Services/user-service');
const { accessSync } = require('fs');
const { captureRejectionSymbol } = require('events');
const { createAuditLog } = require('./audit-controller');
const { response } = require('express');
require('dotenv').config();

const register = async (req, res) => {
    const data = req.body;
    const files = req.file;

    try {
        const response = await registerServices.registerUser(data, files);
        const userData = response.data.user.dataValues;
        // console.log(response.data.user.dataValues)
        if (!userData) {
            return res.status(500).json({ message: "User registration unsuccessful" });
        }
        const action = "CREATE";
        const entityType = userData.role || "Unknown";
        const entityId = userData.id || "Not available";
        // performed by should contain the id of the performer which can be brought by decoding JWT token
        // here i mentioned userData.id just for now after implementing JWT authentication then change it
        const performedBy = data.company_id || "Self";
        const details = `${entityType} account created by ${performedBy}`;
        const ipAddress = req.ip || "0.0.0.0";
        const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });

        return res.status(201).json({response,auditResponse});
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: error.message });
    }
};


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

        const updatedUser = await registerServices.updateUserById(id, data, documelntPath);

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: " failed to update user", error: error.message })
    }
}



//delete user

const deleteUserById = async (req, res) => {
    try {
        const userData = await registerServices.getUserbyid(req.params.id);

        const userdeleted = await registerServices.deleteUser(req.params.id);

        // console.log(userData);
        if (!userData) {
            return res.status(500).json({ message: "User registration unsuccessful" });
        }
        const action = "DELETE";
        const entityType = userData.role || "Unknown";
        const entityId = userData.id || "Not available";
        // performed by should contain the id of the performer which can be brought by decoding JWT token
        // here i mentioned userData.id just for now after implementing JWT authentication then change it
        const performedBy = data.company_id || "Self";
        const details = `${entityType} account created by ${performedBy}`;
        const ipAddress = req.ip || "0.0.0.0";
        const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });

        res.status(200).json({ message: ' user deleted succesfully', userdeleted });

    }
    catch (error) {
        res.status(500).json({ message: 'user not deleted' })
    }
}




module.exports = { register, getAllUsers, getUserByIdController, updateUserById, deleteUserById }