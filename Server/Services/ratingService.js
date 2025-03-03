const Rating = require("../Models/ratingsModel");
const logActivity = require("../Activity/activityFunction.js");
exports.createRating = async (data) => {
  try {
    const rating = await Rating.create(data);
    try {
      await logActivity(
        rating.id,
        "Rating Created",
        rating.rating,
        rating.name,
        "Rating Management"
      );
      // console.log("Activity logged successfully");
    } catch (logErr) {
      console.error("Error logging activity:", logErr);
    }

    return rating;
  } catch (err) {
    console.error("Error creating rating:", err);
    throw new Error(err.message); // You can also include more details if needed
  }
};

exports.getAllRatings = async () => {
  try {
    return await Rating.findAll();
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
