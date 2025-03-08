const { Model } = require("sequelize");
const blackList = require("../Models/blackList-model");
const employee = require("../Models/EmployeeModel");
const company = require("../Models/companies");
const logActivity = require("../Activity/activityFunction.js");
//create
exports.createBlackList = async (data) => {
  try {
    const user = await blackList.create(data);

    await logActivity(
      user.id,
      "Blacklist Added",
      `Blacklisted by: ${createdByUser.name} | Blacklisted User: ${user.name}`,
      "Blacklist Management"
    );

    console.log(user);
    return user;
  } catch (error) {
    console.error("Error occured", error.message);
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
    await logActivity(
      user.id,
      " BlackList User Updated ",
      "Temporary blacklist for 90 days - Code: Misconduct",
      `${user.name}`,
      "Blacklist Management"
    );
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
