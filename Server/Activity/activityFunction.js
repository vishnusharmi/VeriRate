const Activity = require("../Models/activityModel.js");

// log activity 
const logActivity = async ({
  userId,
  action,
  details,
  type,
  entity,
  entityId,
}) => {
  try {
    const activity = await Activity.create({
      userId,
      action,
      details,
      type,
      entity,
      entityId,
    });
    console.log("Activity logged successfully:", activity);
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

module.exports = logActivity;