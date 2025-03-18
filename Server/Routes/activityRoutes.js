const express = require("express");
// const ActivityLog = require("../models/activityModel");
const activityController = require("../Controllers/activityController");
const verifyToken = require("../MiddleWares/verifyToken");

const router = express.Router();

// GET Activity Logs with filters and pagination
router.get("/activity-logs", verifyToken, activityController.getRecentActivities);
router.post("/activity-logs", verifyToken, activityController.logActivity);
router.get(
    "/activity-logs/analysis",verifyToken,
    activityController.getRecentActivitiesCards
);

// New route for fetching activity logs of specific types
router.get("/activity-logs/specific-types", verifyToken, activityController.getSpecificTypeActivities);


module.exports = router;
