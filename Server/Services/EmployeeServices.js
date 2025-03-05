const Employee = require("../Models/EmployeeModel"); // Renamed for clarity
const Ratings = require("../Models/ratingsModel");
const definedCrypto = require("../utils/cryptoUtils"); // Encryption utility

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

    const employee = await Employee.create(encryptedData);
    return employee;
  } catch (error) {
    throw new Error(`Error creating employee: ${error.message}`);
  }
};

exports.updateEmployee = async (data, id) => {
  try {
    const encryptedData = {};
    if (data.first_name)
      encryptedData.first_name = definedCrypto.encrypt(data.first_name);
    if (data.last_name)
      encryptedData.last_name = definedCrypto.encrypt(data.last_name);
    if (data.phone_number)
      encryptedData.phone_number = definedCrypto.encrypt(data.phone_number);
    if (data.employment_history)
      encryptedData.employment_history = definedCrypto.encrypt(
        JSON.stringify(data.employment_history)
      );

    const result = await Employee.update(encryptedData, { where: { id } });
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
    const deletedCount = await Employee.destroy({ where: { id } });
    if (!deletedCount) throw new Error("Employee not found");
    return true;
  } catch (error) {
    throw new Error(`Error deleting employee: ${error.message}`);
  }
};
