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
//create
// exports.createBlackList = async (data, adminId) => {
//   console.log(data, 'hdhdhdhhdh');
  
//   try {
//     // Check if employee is already blacklisted
//     const existedData = await blackList.findOne({ where: { employee_id: data.employee_id } });

//     if (existedData) {
//       return { statusCode: 400, message: "Employee is already in the blacklist" };
//     }

//     // Create blacklist entry
//     const createBlackList = await blackList.create({ ...data, createdBy: adminId });

//     // Log activity
//     await logActivity(
//       createBlackList.id,
//       "BlackList Added",
//       `Blacklisted by: ${ createBlackList.name} | Blacklisted User: ${user.name}`,
//       "Blacklist Management"
//     );

//     return { statusCode: 201, message: "Blacklist created successfully", createBlackList };

//   } catch (error) {
//     console.error("Error occurred:", error.message);
//     return { statusCode: 500, message: "Internal Server Error" };
//   }
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
exports.updateBlackList = async (id, data,adminId) => {
  try {
    const user = await blackList.findByPk(id);
    if (!user) {
      return "User id not available";
    }

    // const updateUser = await blackList.update(data, { where: { id } });
    // await logActivity(
    //   user.id,
    //   " BlackList User Updated ",
    //   "Temporary blacklist for 90 days - Code: Misconduct",
    //   `${user.name}`,
    //   "Blacklist Management"
    // );
    // await logActivity({
    //   userId : userData.id,
    //   action : `New ${data.role || "User"} created`,
    //   details : userData.username,
    //   type : "Blacklist",
    //   entity : "Blacklist Management",
    //   entityId : userData.id
    // })
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
