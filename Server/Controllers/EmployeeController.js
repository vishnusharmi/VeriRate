const employeeService = require("../Services/EmployeeServices");

const createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    return res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res
      .status(500)
      .json({ message: "Error creating employee", error: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  const {page,pageSize}=req.query;
  try {
    const employees = await employeeService.getAllEmployees(page,pageSize);
    console.log(employees);
    return res
      .status(200)
      .json({ message: "Employees fetched successfully", employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    return res
      .status(200)
      .json({ message: "Employee fetched successfully", employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res
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
    return res.status(200).json({
      message: "Employee updated successfully",
      result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deleted = await employeeService.deleteEmployee(req.params.id);
    return res
      .status(deleted ? 200 : 404)
      .json({ message: deleted ? "Employee deleted" : "Not found" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting", error: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
