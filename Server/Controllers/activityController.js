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
  const id = req.userId;
  try {
    const employeeCount = await activityService.getActiveEmployeeCount(id);

    const getActiveDisputes = await activityService.getActiveDisputes();
    console.log(getActiveDisputes + "getActiveDisputes");
    const getResolvedDisputes = await activityService.getResolvedDisputes();
    console.log(getResolvedDisputes + "getResolvedDisputes");

    const sendresponseData = {
      activeDisputes: getActiveDisputes,
      resolvedDisputes: getResolvedDisputes,
      activeEmployees: employeeCount.result.length > 0 ? employeeCount.result[0].totalEmployees : 0,
      employeeCount: employeeCount,
    };

    return res.status(200).json(sendresponseData);
  } catch (error) {
    console.error("Error fetching employee count:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// New controller method for fetching activity logs of specific types
exports.getSpecificTypeActivities = async (req, res) => {
  try {
    const activities = await activityService.getSpecificTypeActivities();
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch specific type activities", error: error.message });
  }
};
