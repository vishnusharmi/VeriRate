const blackList = require("../Models/blackList-model");
const logActivity = require("../Activity/activityFunction.js");
const User = require("../Models/user.js");
const Company = require("../Models/companies");
const Employee = require("../Models/EmployeeModel");
//create
exports.createBlackList = async (data, adminId) => {
  try {
    // fetching the Employee admin user data 
    const employeeAdminUser = await User.findByPk(adminId);
    if (!employeeAdminUser) {
      throw new Error(`User with ID ${adminId} does not exist.`);
    }

    // fetching the blacklist based on id(checking whether employee is blacklisted or not)
    let blackListUserExist = await blackList.findOne({ where: { employee_id: data.employee_id } });
    if (blackListUserExist) {
      throw new Error(`user with ID ${data.employee_id} is already blacklisted`);
    }

    // fetching employee User information
    const employeeInfo = await Employee.findByPk(data.employee_id);
    if (!employeeInfo) {
      throw new Error(`Employee User with ID ${data.employee_id} does not exist.`);
    }


    const employeeUser = await User.findByPk(employeeInfo.userId);
    if (!employeeUser) {
      throw new Error(`Employee User with ID ${employeeInfo.userId} does not exist.`);
    }


    const companyInfo = await Company.findByPk(employeeInfo.company_id);
    if (!companyInfo) {
      throw new Error(`Company with ID ${employeeInfo.company_id} does not exist.`);
    }


    const payload = {
      created_by: adminId,
      fullname: employeeUser.username,
      email: employeeUser.email,
      contact_number: employeeInfo.phone_number,
      position: employeeInfo.position,
      company_id: employeeInfo.company_id,
      company_name: companyInfo.companyName,
      ...data
    };

    const user = await blackList.create(payload);

    await logActivity({
      userId: employeeUser.id,
      action: `Employee ${employeeUser.username} blackListed by ${employeeAdminUser.username}`,
      details: employeeUser.username,
      type: "Blacklist",
      entity: "Blacklist Management",
      entityId: employeeAdminUser.id
    })

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

//update
exports.updateBlackList = async (id, data, adminId) => {
  try {
    const user = await blackList.findByPk(id);
    if (!user) {
      return "User id not available";
    }
    const updateUser = await blackList.update({ ...data, createdBy: adminId }, { where: { id } });
    await logActivity(
      user.id,
      " BlackList User Updated ",
      "Temporary blacklist for 90 days - Code: Misconduct",
      `${user.name}`,
      "Blacklist Management"
    );
    return updateUser;
  } catch (error) {
    throw error;
  }
};

//delete
exports.deleteBlackList = async (id) => {
  try {
    const user = await blackList.findByPk(id);
    if (!user) {
      throw new Error(`Couldn not find BlackList with ID ${id}`);
    }

    const deletedUser = await blackList.destroy({ where: { id } });
    // await logActivity(
    //   user.id,
    //   " BlackList User Deleted",
    //   "Temporary blacklist for 90 days - Code: Misconduct",
    //   `${user.name}`,
    //   "Blacklist Management"
    // );

    return deletedUser;
  } catch (error) {
    throw error;
  }
};
