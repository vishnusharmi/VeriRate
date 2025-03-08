const express = require("express");
// const ActivityLog = require("../models/activityModel");
const activityController = require("../Controllers/activityController");

const router = express.Router();

// GET Activity Logs with filters and pagination
router.get("/activity-logs", activityController.getRecentActivities);
router.post("/activity-logs", activityController.logActivity);
// router.get(
//   "/activity-logs/recent-cards",
//   activityController.getRecentActivitiesCards
// );

module.exports = router;
