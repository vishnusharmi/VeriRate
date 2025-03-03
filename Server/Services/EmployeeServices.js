const Company = require("../Models/companies");
const UserTable = require("../Models/EmployeeModel");
const Ratings = require("../Models/ratingsModel");
const logActivity = require("../Activity/activityFunction.js");
const Activity = require("../Models/activityModel.js");
exports.createEmployee = async (data) => {
  try {
    console.log(data);
    const employee = await UserTable.create(data);
    await logActivity(
      employee.id,
      " New employee profile created",
      `${employee.first_name} ${employee.last_name}`,
      "Employee",
      "Employee Management"
    );
    console.log("Activity logged successfully", logActivity);
    return employee;
  } catch (error) {
    throw new Error(`Error creating employee: ${error.message}`);
  }
};

// exports.updateEmployee = async (data, id) => {
//   try {
//     const result = await UserTable.update(data, {
//       where: { id: id },
//     });
//     await logActivity(
//       employee.id,
//       "employee profile Updated",
//       `${employee.first_name} ${employee.last_name}`,
//       "Employee",
//       "Employee Management"
//     );
//     return result;
//   } catch (error) {
//     console.log("Error in updateEmployee service:", error);
//     throw new Error("Error updating employee");
//   }
// };

// exports.updateEmployee = async (data, id) => {
//   try {
//     const employee = await UserTable.findByPk(id);
//     if (!employee) {
//       throw new Error("Employee not found");
//     }
//     const result = await UserTable.update(data, {
//       where: { id: id },
//     });

//     await logActivity(
//       employee.id,
//       "employee profile Updated",
//       `${employee.first_name} ${employee.last_name}`,
//       "Employee",
//       "Employee Management"
//     );

//     return result;
//   } catch (error) {
//     console.log("Error in updateEmployee service:", error);
//     throw new Error("Error updating employee");
//   }
// };

exports.updateEmployee = async (data, id) => {
  try {
    const employee = await UserTable.findByPk(id);
    if (!employee) {
      throw new Error("Employee not found");
    }

    // Check if the is_verified field is being updated to "Verified"
    const isVerified =
      data.is_verified === "Verified" && employee.is_verified !== "Verified";

    // Update the employee's record
    const result = await UserTable.update(data, {
      where: { id: id },
    });

    // Log activity based on whether the status was updated to "verified" or the profile was updated
    if (isVerified) {
      await logActivity(
        employee.id,
        "employee verified",
        `${employee.first_name} ${employee.last_name}`,
        "Employee",
        "Employee Management"
      );
    } else {
      await logActivity(
        employee.id,
        "Employee profile Updated",
        `${employee.first_name} ${employee.last_name}`,
        "Employee",
        "Employee Management"
      );
    }

    return result;
  } catch (error) {
    console.log("Error in updateEmployee service:", error);
    throw new Error("Error updating employee");
  }
};

exports.getAllEmployees = async () => {
  try {
    return await UserTable.findAll({ include: [Ratings] });
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

// exports.deleteEmployee = async (id) => {
//   try {
//     const deletedCount = await UserTable.destroy({
//       where: { id: id },
//     });
//     await logActivity(
//       employee.id,
//       "employee profile deleted",
//       `${employee.first_name} ${employee.last_name}`,
//       "Employee",
//       "Employee Management"
//     );
//     if (!deletedCount) throw new Error("Employee not found");
//     return true;
//   } catch (error) {
//     throw new Error(`Error deleting employee: ${error.message}`);
//   }
// };
exports.deleteEmployee = async (id) => {
  try {
    // Step 1: Fetch the employee by ID
    const employee = await UserTable.findByPk(id); // Adjust this if needed, e.g., using 'findOne' or other methods

    // Check if employee exists
    if (!employee) {
      throw new Error("Employee not found");
    }

    // Step 2: Delete the employee
    const deletedCount = await UserTable.destroy({
      where: { id: id },
    });

    // Step 3: Log the activity (after successful deletion)
    await logActivity(
      employee.id,
      "employee profile deleted",
      `${employee.first_name} ${employee.last_name}`,
      "Employee",
      "Employee Management"
    );

    // Step 4: Ensure deletion was successful
    if (!deletedCount) {
      throw new Error("Error deleting employee");
    }

    return true;
  } catch (error) {
    console.error("Error in deleteEmployee service:", error);
    throw new Error(`Error deleting employee: ${error.message}`);
  }
};
