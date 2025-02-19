// controllers/userController.js
const { where } = require("underscore");
const UserTable = require("../Model/EmployeeModel");
const employeeService = require("../Services/EmployeeServices");
const createUser = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json({
      message: "User created successfully",
      employee,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const employee = await employeeService.updateEmployee(req.body);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const users = await UserTable.findByPk(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserTable.destroy({
      where: { id: userId },
    });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting:", error);
    res.status(500).json({
      message: "Error deleting user from database",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { firstName, lastName, age, gender, email } = req.body;
  try {
    const [updated] = await UserTable.update(
      { firstName, lastName, age, gender, email }, // Fields to update
      { where: { id: req.params.id } } // Condition to find the user by ID
    );

    // Successfully updated
    res.status(200).json({ message: "User updated successfully", updated });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Error updating user in database",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
