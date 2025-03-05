const express = require("express");
const {
  logActivity,
  getRecentActivities,
} = require("../Controllers/activityController");
const { protect, authorize } = require("../MiddleWares/auth");
const Activity = require("../Models/activityModel"); // Import the Activity model

const router = express.Router();

// Protect all routes (require authentication)
// router.use(protect);

// Fetch recent activities with filters
router.get("/getRecentActivities", getRecentActivities);

// Log a new activity
router.post("/", logActivity);

// Delete an activity (admin only)
// router.delete("/:id", authorize("admin"), async (req, res) => {
//   try {
//     const activity = await Activity.findByPk(req.params.id);

//     // Check if the activity exists
//     if (!activity) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Activity not found" });
//     }

//     // Check if the activity belongs to the user's company
//     if (activity.companyId !== req.user.companyId) {
//       return res.status(403).json({ success: false, error: "Unauthorized" });
//     }

//     // Delete the activity
//     await activity.destroy();

//     return res.status(200).json({ success: true, data: {} });
//   } catch (error) {
//     console.error("Error deleting activity:", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Server error while deleting activity" });
//   }
// });

module.exports = router;
