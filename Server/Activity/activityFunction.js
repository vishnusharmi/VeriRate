const Activity = require("../Models/activityModel.js");
const logActivity = async (userId, action, details, type, entity, priority) => {
  try {
    const activity = new Activity({
      userId,
      action,
      details,
      type,
      entity,
      priority,
    });
    await activity.save();
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

module.exports = logActivity;
