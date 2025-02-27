const Company = require("../Models/companies");
const UserTable = require("../Models/EmployeeModel");
const Ratings = require("../Models/ratingsModel");

exports.createEmployee = async (data) => {
  try {
    const employee = await UserTable.create(data);
    return employee;
  } catch (error) {
    throw new Error(`Error creating employee: ${error.message}`);
  }
};

exports.updateEmployee = async (data, id) => {
  try {
    const result = await UserTable.update(data, {
      where: { id: id },
    });
    return result;
  } catch (error) {
    console.log("Error in updateEmployee service:", error);
    throw new Error("Error updating employee");
  }
};

exports.getAllEmployees = async () => {
  try {
    return await UserTable.findAll({ include: [Ratings]});
  } catch (error) {
    throw new Error(`Error fetching employees: ${error.message}`);
  }
};

exports.getEmployeeById = async (id) => {
  try {
    const employee = await UserTable.findByPk(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  } catch (error) {
    throw new Error(`Error fetching employee: ${error.message}`);
  }
};

exports.deleteEmployee = async (id) => {
  try {
    const deletedCount = await UserTable.destroy({
      where: { id: id },
    });

    if (!deletedCount) throw new Error("Employee not found");
    return true;
  } catch (error) {
    throw new Error(`Error deleting employee: ${error.message}`);
  }
};
