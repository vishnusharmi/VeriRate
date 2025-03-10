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
      " BlackList Added ",
      "Temporary blacklist for 90 days - Code: Misconduct",
      `${user.name}`,
      "Blacklist Changes "
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
exports.readAllBlackList = async (page=1,pageSize=10) => {
  const limit = pageSize 
  const offset = (page - 1) * pageSize
  try {
    const { count, rows } = await blackList.findAndCountAll({
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
      "Blacklist Changes "
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
      "Blacklist Changes "
    );
    return deletedUser;
  } catch (error) {
    console.error("Error occured", error.message);
  }
};
