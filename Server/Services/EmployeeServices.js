const Employee = require("../Models/EmployeeModel"); // Renamed for clarity
const Ratings = require("../Models/ratingsModel");
const logActivity = require("../Activity/activityFunction.js");
const Activity = require("../Models/activityModel.js");
exports.createEmployee = async (data) => {
  try {
    const encryptedData = {
      first_name: definedCrypto.encrypt(data.first_name),
      last_name: definedCrypto.encrypt(data.last_name),
      phone_number: data.phone_number
        ? definedCrypto.encrypt(data.phone_number)
        : null,
      employment_history: data.employment_history
        ? definedCrypto.encrypt(JSON.stringify(data.employment_history))
        : null,
      company_id: data.company_id,
      userId: data.userId,
    };
    const employee = await UserTable.create(encryptedData);
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

exports.updateEmployee = async (data, id) => {
  try {
    // const encryptedData = {};
    // if (data.first_name)
    //   encryptedData.first_name = definedCrypto.encrypt(data.first_name);
    // if (data.last_name)
    //   encryptedData.last_name = definedCrypto.encrypt(data.last_name);
    // if (data.phone_number)
    //   encryptedData.phone_number = definedCrypto.encrypt(data.phone_number);
    // if (data.employment_history)
    //   encryptedData.employment_history = definedCrypto.encrypt(
    //     JSON.stringify(data.employment_history)
    //   );
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
    const employees = await Employee.findAll({ include: [Ratings] });

    return employees.map((employee) => ({
      id: employee.id,
      first_name: definedCrypto.decrypt(employee.first_name),
      last_name: definedCrypto.decrypt(employee.last_name),
      phone_number: employee.phone_number
        ? definedCrypto.decrypt(employee.phone_number)
        : null,
      employment_history: employee.employment_history
        ? JSON.parse(definedCrypto.decrypt(employee.employment_history))
        : null,
      company_id: employee.company_id,
      userId: employee.userId,
    }));
  } catch (error) {
    throw new Error(`Error fetching employees: ${error.message}`);
  }
};

exports.getEmployeeById = async (id) => {
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new Error("Employee not found");
    }

    return {
      id: employee.id,
      first_name: definedCrypto.decrypt(employee.first_name),
      last_name: definedCrypto.decrypt(employee.last_name),
      phone_number: employee.phone_number
        ? definedCrypto.decrypt(employee.phone_number)
        : null,
      employment_history: employee.employment_history
        ? JSON.parse(definedCrypto.decrypt(employee.employment_history))
        : null,
      company_id: employee.company_id,
      userId: employee.userId,
    };
  } catch (error) {
    throw new Error(`Error fetching employee: ${error.message}`);
  }
};

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
