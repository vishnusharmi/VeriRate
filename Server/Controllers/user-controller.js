const definedCrypto = require("../utils/definedCryptoUtils"); // Utility for encryption/decryption
const registerServices = require("../Services/user-service");

const register = async (req, res) => {
  try {
    const data = req.body;
    const files = req.file;

    // Encrypt email before saving
    if (data.email) {
      data.email = definedCrypto.encrypt(data.email);
    }

    const response = await registerServices.registerUser(data, files);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const user = await registerServices.getUserById(req.params.id);

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

    const updatedUser = await registerServices.updateUserById(id, data);
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    await registerServices.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "User not deleted" });
  }
};

module.exports = {
  register,
  getAllUsers,
  getUserByIdController,
  updateUserById,
  deleteUserById,
};
