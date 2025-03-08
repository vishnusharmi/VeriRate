const activityService = require("../Services/activity-services");

// Controller to log an activity
exports.logActivity = async (req, res) => {
  try {
    const activity = await activityService.logActivity({
      ...req.body,
      user: req.user,
    });

    return res.status(201).json({ success: true, data: activity });
  } catch (error) {
    console.error("Error logging activity:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to fetch recent activities
exports.getRecentActivities = async (req, res) => {
  try {
    const activities = await activityService.getRecentActivities(req.query);
    return res.status(200).json({ success: true, ...activities });
  } catch (error) {
    console.error("Error fetching activity logs:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller to fetch active employee count
exports.getRecentActivitiesCards = async (req, res) => {
  try {
    const employeeCount = await activityService.getActiveEmployeeCount();
    return res.status(200).json({ success: true, employeeCount });
  } catch (error) {
    console.error("Error fetching employee count:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};


// by basha bhai