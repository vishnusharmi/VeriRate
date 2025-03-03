const employeeService = require("../Services/EmployeeServices");
// const UserTable = require("../Models/EmployeeModel");

const createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res
      .status(500)
      .json({ message: "Error creating employee", error: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json({
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({
      message: "Employee fetched successfully",
      employee,
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res
      .status(500)
      .json({ message: "Error fetching employee", error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    console.log(updateData);
    const result = await employeeService.updateEmployee(updateData, id);
    res.status(200).json({
      message: "Employee updated successfully",
      result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await employeeService.deleteEmployee(id);
    res
      .status(deleted ? 200 : 404)
      .json({ message: deleted ? "Employee deleted" : "Not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting", error: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
