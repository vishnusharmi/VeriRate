require("dotenv").config();
const definedCrypto = require("../utils/cryptoUtils.js"); // Utility for encryption/decryption
const registerServices = require("../Services/user-service.js");
const trackUser = require("../utils/trackUser.js");

const register = async (req, res) => {
  const data = req.body;
  const files = req.files;
  const adminId = req.userId;

  try {
    const response = await registerServices.registerUser(adminId, data, files);

    if (!response || !response.data || !response.data.user) {
      console.error("❌ Request or response object is missing.");
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const userId = response.data.user.id || response.data.user.dataValues?.id;

    req.trackUserId = userId;

    trackUser(req, res);
    if (!res.headersSent) {
      return res.status(201).json({ response });
    }

  } catch (error) {
    // console.error('Registration error:', error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await registerServices.getAllusers();

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
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
    return res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// const updateUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     let data = req.body;
//     if (data.email) {
//       data.email = definedCrypto.encrypt(data.email);
//     }

//     const documentPath = req.file ? req.file : null;

//     const updatedUser = await registerServices.updateUserById(id, data, documentPath);

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: " failed to update user", error: error.message })
//   }
// };

//delete user

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;

    // Extract file path if a new file is uploaded
    const documentPath = req.file ? req.file.path : null;

    const updatedUser = await registerServices.updateUserById(
      id,
      data,
      documentPath
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: " failed to update user", error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userdeleted = await registerServices.deleteUser(req.params.id);

    return res.status(200).json({ message: " user deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "user not deleted" });
  }
};

const getEmployeeAdmins = async (req, res) => {
  try {
    const employeeAdmins = await registerServices.getEmployeeAdmins();
    return res.status(200).json({
      success: true,
      message: "Employee Admins retrieved successfully",
      data: employeeAdmins,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve Employee Admins", error: error.message });
  }
};

module.exports = {
  register,
  getAllUsers,
  getUserByIdController,
  updateUserById,
  deleteUserById,
  getEmployeeAdmins,
};
