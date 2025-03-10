const Rating = require("../Models/ratingsModel");
const logActivity = require("../Activity/activityFunction.js");
const User = require("../Models/user.js");
const Employee = require("../Models/EmployeeModel.js");

exports.createRating = async (data,req) => {
  try {
    // 🔍 Step 1: Check if Employee exists
    const employeeExists = await Employee.findByPk(data.employee_id);
    if (!employeeExists) {
      throw new Error(`Employee with ID ${data.employee_id} does not exist.`);
    }

    const employeeUser = await User.findByPk(employeeExists.userId);
    if(!employeeUser) {
      throw new Error(`Employee User with ID ${employeeExists.userId} does not exist.`);
    }
    // 🔍 Step 2: Fetch User Name (Who Gave the Rating)
    const user = await User.findByPk(req.userId);
    if (!user) {
      throw new Error(`User with ID ${req.userId} does not exist.`);
    }
    const rating = await Rating.create({created_by: req.userId,name:employeeUser.username || "Unknown",...data});
    try {
      await logActivity({
        userId : user.id,
        action : `New rating given by user ${user.username} to ${data.name}`,
        details : user.username,
        type : "Rating",
        entity : "Rating Management",
        entityId : user.id
      })
    } catch (logErr) {
      throw error;
    }

    return rating;
  } catch (error) {
    throw error;
  }
};

exports.getAllRatings = async (page=1,pageSize=10) => {
  const limit = pageSize 
  const offset = (page - 1) * pageSize
  try {
    const { count, rows } = await Rating.findAndCountAll({
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
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getRatingById = async (id) => {
  try {
    const ratingById = await Rating.findByPk(id);
    if(!ratingById){
      throw new Error(`Rating with ID ${id} does not exist`);
    }
    return ratingById;
  } catch (error) {
    throw error;
  }
};

exports.updateRating = async (id, data, req) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      throw new Error(`User with ID ${req.userId} does not exist.`);
    }

    const rating = await Rating.findByPk(id);
    if (!rating) {
      throw new Error(`Rating with ID ${id} does not exist.`);
    }

    const employee = await Employee.findByPk(rating.employee_id);
    if (!employee) {
      throw new Error(`Employee with ID ${rating.employee_id} does not exist.`);
    }

    const employeeUser = await User.findByPk(employee.userId);
    if (!employeeUser) {
      throw new Error(`Employee User with ID ${employee.userId} does not exist.`);
    }
    const updated = await Rating.update(data, { where: { id } });


    await logActivity({
      userId : user.id,
      action : `Rating Updated by user ${user.username} to ${employeeUser.username}`,
      details : user.username,
      type : "Rating",
      entity : "Rating Management",
      entityId : user.id
    })

    return updated;
  } catch (error) {
    throw error;
  }
};


exports.deleteRating = async (id, req) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      throw new Error(`User with ID ${req.userId} does not exist.`);
    }

    const rating = await Rating.findByPk(id);
    if (!rating) {
      throw new Error(`Rating with ID ${id} does not exist.`);
    }

    const employee = await Employee.findByPk(rating.employee_id);
    if (!employee) {
      throw new Error(`Employee with ID ${rating.employee_id} does not exist.`);
    }

    const employeeUser = await User.findByPk(employee.userId);
    if (!employeeUser) {
      throw new Error(`Employee User with ID ${employee.userId} does not exist.`);
    }

    const deleted = await Rating.destroy({ where: { id } });

    await logActivity({
      userId: user.id,
      action: `rating of user: ${employeeUser.username} ID:${rating.id} is deleted by ${user.username} of ID: ${user.id}`,
      details: user.username,
      type: "Rating",
      entity: "Rating Management",
      entityId: user.id
    });
    
    return deleted;
  } catch (error) {
    throw error;
  }
};
