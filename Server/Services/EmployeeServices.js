const Employee = require("../Models/EmployeeModel"); // Renamed for clarity
const Ratings = require("../Models/ratingsModel");
const logActivity = require("../Activity/activityFunction.js");
const Activity = require("../Models/activityModel.js");
const User = require("../Models/user.js");
const Company = require("../Models/companies.js");
const Company = require("../Models/companies.js");

exports.createEmployee = async (data) => {
  try {
    const employee = await Employee.create(data);

    await logActivity(
      employee.id,
      "New employee profile created",
      `${employee.first_name} ${employee.last_name}`,
      "Employee",
      "Employee Management"
    );

    return employee;
  } catch (error) {
    throw new Error(`Error creating employee: ${error.message}`);
  }
};

exports.updateEmployee = async (data, id) => {
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new Error("Employee not found");
    }

    const isVerified = data.is_verified === "Verified" && employee.is_verified !== "Verified";

    const result = await Employee.update(data, {
      where: { id: id },
    });

    if (isVerified) {
      await logActivity(
        employee.id,
        "Employee verified",
        `${employee.first_name} ${employee.last_name}`,
        "Employee",
        "Employee Management"
      );
    } else {
      await logActivity(
        employee.id,
        "Employee profile updated",
        `${employee.first_name} ${employee.last_name}`,
        "Employee",
        "Employee Management"
      );
    }

    return result;
  } catch (error) {
    console.log("Error in updateEmployee service:", error);
    throw error;
  }
};

exports.getAllEmployees = async (page, pageSize) => {
  page = page || 1;
  pageSize = pageSize || 10;
  const limit = pageSize
  const offset = (page - 1) * pageSize
  try {
    const { count, rows } = await Employee.findAndCountAll({
      include: [
        {
          model: Ratings,
        },
        {
          model: Company,
        },
        {
          model: User,
          attributes: ['role', 'email', 'id'], // Fetch only specific fields
          where: { role: 'Employee' } // Condition to get only Employee role users
        }
      ],
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    return {
      totalRecords: count, // Total number of records
      totalPages: Math.ceil(count / pageSize), // Total pages
      currentPage: page,
      pageSize: pageSize,
      data: rows, // Current page data
    }
  } catch (error) {
    console.error("Error occured", error.message);
    throw error;
  }
};



exports.getEmployeeById = async (id) => {
  try {
    const employee = await Employee.findByPk(id);
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
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new Error("Employee not found");
    }

    const deletedCount = await Employee.destroy({
      where: { id: id },
    });

    await logActivity(
      employee.id,
      "Employee profile deleted",
      `${employee.first_name} ${employee.last_name}`,
      "Employee",
      "Employee Management"
    );

    if (!deletedCount) {
      throw new Error("Error deleting employee");
    }

    return true;
  } catch (error) {
    console.error("Error in deleteEmployee service:", error);
    throw new Error(`Error deleting employee: ${error.message}`);
  }
};


//DID BY RASAGNA