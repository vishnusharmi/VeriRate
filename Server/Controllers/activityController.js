// const Activity = require("../Models/activityModel");
// const User = require("../models/User");

// // Log an activity
// exports.logActivity = async (req, res) => {
//   try {
//     const { type, action, entityId, entity, details, metadata } = req.body;

//     // Determine priority based on activity type
//     const priority =
//       type === "blacklist" || type === "verification" ? "high" : "medium";

//     // Create the activity
//     const activity = await Activity.create({
//       type,
//       action,
//       userId: req.user.id, // User ID of the admin/system performing the action
//       companyId: req.user.companyId, // Company ID
//       entity,
//       entityId,
//       details,
//       metadata: metadata || {},
//       priority,
//     });

//     return res.status(201).json({ success: true, data: activity });
//   } catch (error) {
//     console.error("Error logging activity:", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Server error while logging activity" });
//   }
// };

// // Fetch recent activities with filters
// // exports.getRecentActivities = async (req, res) => {
// //   try {
// //     const page = parseInt(req.query.page, 10) || 1; // Current page (default: 1)
// //     const limit = parseInt(req.query.limit, 10) || 20; // Number of items per page (default: 20)
// //     const offset = (page - 1) * limit; // Offset for pagination

// //     // Base filter (always filter by companyId)
// //     const filter = { companyId: req.user.companyId };

// //     // Filter by activity type
// //     if (req.query.type && req.query.type !== "all") {
// //       filter.type = req.query.type;
// //     }

// //     // Filter by entityId
// //     if (req.query.entityId) {
// //       filter.entityId = req.query.entityId;
// //     }

// //     // Fetch activities with pagination and filters
// //     const { count, rows } = await Activity.findAndCountAll({
// //       where: filter,
// //       order: [["timestamp", "DESC"]], // Sort by timestamp (newest first)
// //       offset,
// //       limit,
// //       include: [
// //         {
// //           model: User,
// //           attributes: ["firstName", "lastName", "profilePicture"], // Include user details
// //         },
// //       ],
// //     });

// //     // Format activities for the response
// //     const formattedActivities = rows.map((activity) => ({
// //       id: activity.id,
// //       type: activity.type,
// //       action: activity.action,
// //       user: activity.User
// //         ? `${activity.User.firstName} ${activity.User.lastName}`
// //         : "System", // Display user name or "System"
// //       userPicture: activity.User?.profilePicture || null, // User profile picture (if available)
// //       entity: activity.entity,
// //       entityId: activity.entityId,
// //       details: activity.details,
// //       timestamp: activity.timestamp,
// //       priority: activity.priority,
// //       metadata: activity.metadata,
// //     }));

// //     // Return the response with pagination details
// //     return res.status(200).json({
// //       success: true,
// //       data: formattedActivities,
// //       pagination: {
// //         page,
// //         limit,
// //         total: count, // Total number of activities
// //         pages: Math.ceil(count / limit), // Total number of pages
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Error fetching activities:", error);
// //     return res.status(500).json({
// //       success: false,
// //       error: "Server error while fetching activities",
// //     });
// //   }
// // };
// exports.getRecentActivities = async (req, res) => {
//   try {
//     const activities = await Activity.findAll({
//       include: [
//         {
//           model: Company,
//           required: true, // Ensure Company data is included
//         },
//       ],
//       limit: 10, // Fetch only recent activities (adjust as necessary)
//       order: [["timestamp", "DESC"]], // Order by most recent
//     });

//     // Check if activities are fetched properly
//     if (!activities || activities.length === 0) {
//       return res.status(404).json({ message: "No activities found" });
//     }

//     return res.status(200).json({ activities });
//   } catch (error) {
//     console.error("Error fetching activities:", error);
//     return res.status(500).json({ message: "Error fetching activities" });
//   }
// };
const Activity = require("../Models/activityModel");
const User = require("../Models/user");
const Company = require("../Models/companies"); // Import the Company model

// Log an activity
exports.logActivity = async (req, res) => {
  try {
    const { type, action, entityId, entity, details, metadata } = req.body;

    // Determine priority based on activity type
    const priority =
      type === "blacklist" || type === "verification" ? "high" : "medium";

    // Create the activity
    const activity = await Activity.create({
      type,
      action,
      userId: req.user.id, // User ID of the admin/system performing the action
      companyId: req.user.companyId, // Company ID (assuming it's in req.user)
      entity,
      entityId,
      details,
      metadata: metadata || {},
      priority,
    });

    return res.status(201).json({ success: true, data: activity });
  } catch (error) {
    console.error("Error logging activity:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while logging activity",
    });
  }
};

// Fetch recent activities with filters
exports.getRecentActivities = async (req, res) => {
  try {
    // Fetch recent activities with filtering by companyId
    const activities = await Activity.findAll({
      // include: [
      //   {
      //     model: Company, // Include the Company model
      //     required: true, // Ensure Company data is included
      //   },
      //   {
      //     model: User, // Optionally include the User who triggered the activity
      //     attributes: ["firstName", "lastName", "profilePicture"], // You can customize this based on your needs
      //   },
      // ],
      limit: 5, // Fetch only the most recent 10 activities (adjust as necessary)
      order: [["timestamp", "DESC"]], // Order by timestamp, newest first
    });

    // Check if activities are fetched properly
    if (!activities || activities.length === 0) {
      return res.status(404).json({ message: "No activities found" });
    }

    return res.status(200).json({ activities });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return res.status(500).json({
      message: "Error fetching activities",
      error: error.message,
    });
  }
};
