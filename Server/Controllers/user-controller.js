const bcrypt = require('bcryptjs')
const { accessSync } = require('fs');
const { captureRejectionSymbol } = require('events');
const { createAuditLog } = require('./audit-controller');
const { response } = require('express');
require('dotenv').config();
const definedCrypto = require("../utils/cryptoUtils.js"); // Utility for encryption/decryption
const registerServices = require("../Services/user-service.js");

const register = async (req, res) => {
  const data = req.body;
  const files = req.files;

  try {

    // if (data.email) {
    //   data.email = definedCrypto.encrypt(data.email);
    // }

    const response = await registerServices.registerUser(data, files);
    // const userData = response.data.user;

    // if (userData.role != "SuperAdmin") {

    //   if (!userData) {
    //     return res.status(500).json({ message: "User registration unsuccessful" });
    //   }

    //   const action = "CREATE";
    //   const entityType = userData.role || "Unknown";
    //   const entityId = userData.id || "Not available";
    //   // performed by should contain the id of the performer which can be brought by decoding JWT token
    //   // here i mentioned userData.id just for now after implementing JWT authentication then change it
    //   const performedBy = data.company_id || "Self";
    //   const details = `${entityType} account created by ${performedBy}`;
    //   const ipAddress = req.ip || "0.0.0.0";
    //   const auditResponse = await createAuditLog({ action, entityType, entityId, performedBy, details, ipAddress });

    //   return res.status(201).json({ response, auditResponse });
    // }
    return res.status(201).json({ response })
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await registerServices.getAllUsers();

    // Decrypt email before sending response
    const decryptedUsers = users.map((user) => ({
      ...user,
      email: definedCrypto.decrypt(user.email),
    }));

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: decryptedUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const user = await registerServices.getUserbyid(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Decrypt email before sending response
    user.email = definedCrypto.decrypt(user.email);

    return res
      .status(200)
      .json({ message: "User retrieved successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;
    if (data.email) {
      data.email = definedCrypto.encrypt(data.email);
    }

    const documentPath = req.file ? req.file : null;

    const updatedUser = await registerServices.updateUserById(id, data, documentPath);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: " failed to update user", error: error.message })
  }
};


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
