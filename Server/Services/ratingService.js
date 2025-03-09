const Rating = require("../Models/ratingsModel");
const logActivity = require("../Activity/activityFunction.js");
exports.createRating = async (data) => {
  try {
    // 🔍 Step 1: Check if Employee exists
    const employeeExists = await Employee.findByPk(data.employee_id);
    if (!employeeExists) {
      throw new Error(`Employee with ID ${data.employee_id} does not exist.`);
    }
    // 🔍 Step 2: Fetch User Name (Who Gave the Rating)
    const user = await User.findByPk(data.created_by);
    if (!user) {
      throw new Error(`User with ID ${data.created_by} does not exist.`);
    }
    const rating = await Rating.create(data);
    try {
      await logActivity(
        rating.id,
        "New Rating Created",
        `Given by User: ${user.username} to ${data.name}`, // ✅ Fetching actual user name
        `Rating: ${rating.rating}`,
        "Rating Management"
      );
      console.log("Activity logged successfully");
    } catch (logErr) {
      console.error("Error logging activity:", logErr);
      throw error;
    }

    return rating;
  } catch (err) {
    console.error("Error creating rating:", err);
    throw new Error(err.message);
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
    return await Rating.findByPk(id);
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateRating = async (id, data) => {
  try {
    const rating = await Rating.findByPk(id);
    const updated = await rating.update(data);
    await logActivity(
      rating.id,
      "Rating Updated",
      rating.rating,
      rating.name,
      "Rating Management"
    );
    return updated;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteRating = async (id) => {
  try {
    const rating = await Rating.findByPk(id);
    const deleted = await rating.destroy();
    await logActivity(
      rating.id,
      "Rating Deleted",
      rating.rating,
      rating.name,
      "Rating Management"
    );
    return deleted;
  } catch (error) {
    throw new Error(error.message);
  }
};
