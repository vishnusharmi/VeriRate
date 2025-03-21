const ratingService = require("../Services/ratingService");

//create rating
exports.createRating = async (req, res) => {
  try {
    const rating = await ratingService.createRating(req.body,req);
    return res.status(200).json({
      success: true,
      message: "Rating created",
      data: rating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get all ratings
exports.getAllRatings = async (req, res) => {
  const {page,pageSize}=req.query;
  try {
    const ratings = await ratingService.getAllRatings(page,pageSize);
    return res.status(200).json({
      success: true,
      message: "Ratings of all retrieved",
      data: ratings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get rating by id
exports.getRatingById = async (req, res) => {
  try {
    const rating = await ratingService.getRatingById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Rating by id retrieved",
      data: rating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//update rating
exports.updateRating = async (req, res) => {
  try {
    const rating = await ratingService.updateRating(req.params.id, req.body,req);
    return res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      data: rating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//delete rating
exports.deleteRating = async (req, res) => {
  try {
    const deleted = await ratingService.deleteRating(req.params.id,req);
    return res.status(200).json({
      success: true,
      message: "Rating deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
