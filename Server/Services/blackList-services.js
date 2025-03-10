const { Model } = require("sequelize");
const blackList = require("../Models/blackList-model");
const employee = require("../Models/EmployeeModel");
const company = require("../Models/companies");
const logActivity = require("../Activity/activityFunction.js");
//create
exports.createBlackList = async (data,req) => {
  try {
    let user = await blackList.findByPk({where: {email: data.email}});
    if(user){
      throw new Error(`user with email ${user.email} already exists`);
    }

    user = await blackList.create({created_by: req.userId,...data});

    const employeeUser = await User.findByPk({where: {id: req.userId}})
    if(!employeeUser){
      throw new Error(`Employee User with ID ${req.userId} does not exist.`);
    }

    await logActivity({
      userId : employeeUser.id,
      action : `New Blacklist created by ${employeeUser.username} of ID: ${employeeUser.id} for ${data.email}`,
      details : employeeUser.username,
      type : "Blacklist",
      entity : "Blacklist Management",
      entityId : employeeUser.id
    })

    return user;
  } catch (error) {
    console.error("Error occured", error.message);
    throw error;
  }
};

//read
exports.readBlackList = async (id) => {
  try {
    const user = await blackList.findByPk(id, {
      include: [
        {
          model: employee,
        },
        {
          model: company,
        },
      ],
    });
    if (!user) {
      return "Id not available";
    }
    return user;
  } catch (error) {
    console.error("Error occured", error.message);
  }
};

//get employees by id only name

//read all
exports.readAllBlackList = async () => {
  try {
    const users = await blackList.findAll({ raw: true });
    // if (!user){
    //     return 'Id not available'
    // }
    return users;
  } catch (error) {
    console.error("Error occured", error.message);
  }
};

//update
exports.updateBlackList = async (id, data) => {
  try {
    const user = await blackList.findByPk(id);
    if (!user) {
      return "User id not available";
    }

    const updateUser = await blackList.update(data, { where: { id } });
    // await logActivity(
    //   user.id,
    //   " BlackList User Updated ",
    //   "Temporary blacklist for 90 days - Code: Misconduct",
    //   `${user.name}`,
    //   "Blacklist Management"
    // );
    await logActivity({
      userId : userData.id,
      action : `New ${data.role || "User"} created`,
      details : userData.username,
      type : "Blacklist",
      entity : "Blacklist Management",
      entityId : userData.id
    })
    return updateUser;
  } catch (error) {
    console.error("Error occured", error.message);
  }
};

//delete
exports.deleteBlackList = async (id) => {
  try {
    const user = await blackList.findByPk(id);
    if (!user) {
      return new Promise((_, reject) => reject({ message: "User not found!" }));
    }

    const deletedUser = await blackList.destroy({ where: { id } });
    await logActivity(
      user.id,
      " BlackList User Deleted",
      "Temporary blacklist for 90 days - Code: Misconduct",
      `${user.name}`,
      "Blacklist Management"
    );
    return deletedUser;
  } catch (error) {
    console.error("Error occured", error.message);
  }
};
