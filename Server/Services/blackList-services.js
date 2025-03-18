const blackList = require("../Models/blackList-model");
const logActivity = require("../Activity/activityFunction.js");
const User = require("../Models/user.js");
const Company = require("../Models/companies");
const Employee = require("../Models/EmployeeModel");

exports.createBlackList = async (data, adminId) => {
  try {
    // fetching the Employee admin user data
    const employeeAdminUser = await User.findByPk(adminId);

    if (!employeeAdminUser) {
      throw new Error(`User with ID ${adminId} does not exist.`);
    }

    // fetching the blacklist based on id(checking whether employee is blacklisted or not)
    let blackListUserExist = await blackList.findOne({
      where: { employee_id: data.employee_id },
    });

    if (blackListUserExist) {
      throw new Error(
        `user with ID ${data.employee_id} is already blacklisted`
      );
    }

    // fetching employee User information
    const employeeInfo = await Employee.findByPk(data.employee_id);
    if (!employeeInfo) {
      throw new Error(
        `Employee User with ID ${data.employee_id} does not exist.`
      );
    }

    const employeeUser = await User.findByPk(employeeInfo.userId);
    if (!employeeUser) {
      throw new Error(
        `Employee User with ID ${employeeInfo.userId} does not exist.`
      );
    }

    const companyInfo = await Company.findByPk(employeeInfo.company_id);
    if (!companyInfo) {
      throw new Error(
        `Company with ID ${employeeInfo.company_id} does not exist.`
      );
    }

    const payload = {
      created_by: adminId,
      fullname: employeeUser.username,
      email: employeeUser.email,
      contact_number: employeeInfo.phone_number,
      position: employeeInfo.position,
      company_id: employeeInfo.company_id,
      company_name: companyInfo.companyName,
      ...data,
    };

    const user = await blackList.create(payload);
    await logActivity({
      userId: employeeUser.id,
      action: `Employee ${employeeUser.username} blackListed by ${employeeAdminUser.username}`,
      details: employeeUser.username,
      type: "Blacklist",
      entity: "Blacklist Management",
      entityId: employeeAdminUser.id,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

//read
exports.readBlackList = async (id) => {
  try {
    const user = await blackList.findByPk(id);
    if (!user) {
      throw new Error(`BlackList with ID ${id} does not exist.`);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

//get employees by id only name

//read all
exports.readAllBlackList = async () => {
  try {
    // const users = await blackList.findAll({ raw: true });
    const users = await blackList.findAll();

    return users;
  } catch (error) {
    throw error;
  }
};

exports.updateBlackList = async (id, data, adminId) => {
  try {
    const user = await blackList.findByPk(id);
    if (!user) {
      throw new Error(`BlackList with ID ${id} does not exist.`);
    }

    const employeeAdminUser = await User.findByPk(adminId);
    if (!employeeAdminUser) {
      throw new Error(`User with ID ${adminId} does not exist.`);
    }

    const updatedUser = await blackList.update(
      { ...data, created_by: adminId },
      { where: { id }}
    );

    await logActivity({
      userId: user.id,
      action: `Employee ${user.fullname} updated in blacklist by ${employeeAdminUser.username}`,
      details: user.fullname,
      type: "Blacklist",
      entity: "Blacklist Management",
      entityId: adminId,
    });

    return updatedUser; // returning the updated user
  } catch (error) {
    throw error;
  }
};


exports.deleteBlackList = async (id, adminId) => {
  try {
    const user = await blackList.findByPk(id);
    if (!user) {
      throw new Error(`Couldn't find BlackList with ID ${id}`);
    }

    const loggedinUser = await User.findByPk(adminId);
    if (!loggedinUser) {
      throw new Error(`User with ID ${adminId} does not exist.`);
    }
    const deletedUser = await blackList.destroy({ where: { id } });

    await logActivity({
      userId: user.id,
      action: `Employee ${user.fullname} removed from blacklist by Admin ID ${loggedinUser.username}`,
      details: user.fullname,
      type: "Blacklist",
      entity: "Blacklist Management",
      entityId: adminId,
    });

    return deletedUser;
  } catch (error) {
    throw error;
  }
};
