// const { Op } = require("sequelize");
// const ActivityLog = require("../Models/activityModel");
// const Employee = require("../Models/EmployeeModel");
// const Disputes = require("../Models/disputes");
// const sequelize = require("../Config/DBconnection");

// // Service to log an activity
// exports.logActivity = async ({
//   type,
//   action,
//   entityId,
//   entity,
//   details,
//   metadata,
//   user,
// }) => {
//   if (!type || !action) {
//     throw new Error("Type and action are required fields.");
//   }

//   if (!user || !user.id || !user.companyId) {
//     throw new Error("Unauthorized. User details missing.");
//   }

//   const priority = ["blacklist", "verification"].includes(type)
//     ? "high"
//     : "medium";

//   return await ActivityLog.create({
//     type,
//     action,
//     userId: user.id,
//     companyId: user.companyId,
//     entity,
//     entityId,
//     details,
//     metadata: metadata || {},
//     priority,
//   });
// };

// // Service to fetch recent activities with filters
// exports.getRecentActivities = async ({ entity, period, page, limit }) => {
//   page = parseInt(page) || 1;
//   limit = parseInt(limit) || 10;
//   let whereCondition = {};

//   if (entity && entity !== "All Activities") {
//     whereCondition.entity = entity;
//   }

//   const today = new Date();
//   let startDate = null;

//   switch (period) {
//     case "Today":
//       startDate = new Date(today.setHours(0, 0, 0, 0));
//       break;
//     case "This Week":
//       startDate = new Date(today.setDate(today.getDate() - today.getDay()));
//       break;
//     case "This Month":
//       startDate = new Date(today.getFullYear(), today.getMonth(), 1);
//       break;
//     default:
//       startDate = null;
//       break;
//   }

//   if (startDate) {
//     whereCondition.createdAt = { [Op.gte]: startDate };
//   }

//   const offset = (page - 1) * limit;

//   const { count, rows } = await ActivityLog.findAndCountAll({
//     where: whereCondition,
//     order: [["createdAt", "DESC"]],
//     limit,
//     offset,
//   });

//   return {
//     totalRecords: count,
//     totalPages: Math.ceil(count / limit),
//     currentPage: page,
//     pageSize: limit,
//     data: rows,
//   };
// };

// // Service to fetch active employee count
// exports.getActiveEmployeeCount = async (id) => {
//   const result = await Employee.findAll({
//     attributes: [
//       [sequelize.fn("COUNT", sequelize.col("id")), "totalEmployees"],
//     ],
//     where: {
//       created_by: id,
//     },
//     group: ["created_by"],
//   });

//   // console.log(result[0].totalEmployees+'totalcount');

//   const admin = await Employee.findOne({
//     attributes: ["first_name", "last_name"],
//     raw: false, // CHANGED TO FALSE FROM TRUE. TRUE WILL RETURN RAW DATA ONLY AND get() WILL NOT WORK
//     where: { created_by: id }, // Fetching the Employee Admin using req.userId
//   });
//   // console.log(admin+'admin')

//   if (admin) {
//     console.log("Admin Name:", admin.first_name, admin.last_name);
//   }
//   return { result, admin };
// };

// exports.getActiveDisputes = async () => {
//   const activeDisputesCount = await Disputes.count({
//     where: {
//       status: {
//         [Op.in]: ["pending", "info_requested"],
//       },
//     },
//   });
//   return activeDisputesCount;
// };

// exports.getResolvedDisputes = async () => {
//   const solvedDisputesCount = await Disputes.count({
//     where: {
//       status: {
//         [Op.in]: ["approved", "rejected"],
//       },
//     },
//   });

//   return solvedDisputesCount;
// };


// // New service method for fetching activity logs of specific types
// exports.getSpecificTypeActivities = async () => {
//   try {
//     const activities = await ActivityLog.findAll({
//       where: {
//         type: ["User", "Login", "OTP Verification","Password Reset"],
//       },
//     });
//     return activities;
//   } catch (error) {
//     throw new Error("Failed to fetch specific type activities");
//   }
// };


const { Op } = require("sequelize");
const ActivityLog = require("../Models/activityModel");
const Employee = require("../Models/EmployeeModel");
const Disputes = require("../Models/disputes");
const sequelize = require("../Config/DBconnection");

// Service to log an activity
exports.logActivity = async ({
  type,
  action,
  entityId,
  entity,
  details,
  metadata,
  user,
}) => {
  if (!type || !action) {
    throw new Error("Type and action are required fields.");
  }

  if (!user || !user.id || !user.companyId) {
    throw new Error("Unauthorized. User details missing.");
  }

  const priority = ["blacklist", "verification"].includes(type)
    ? "high"
    : "medium";

  return await ActivityLog.create({
    type,
    action,
    userId: user.id,
    companyId: user.companyId,
    entity,
    entityId,
    details,
    metadata: metadata || {},
    priority,
  });
};

// Service to fetch recent activities with filters
exports.getRecentActivities = async ({ entity, period, page, limit }) => {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  let whereCondition = {};

  if (entity && entity !== "All Activities") {
    whereCondition.entity = entity;
  }

  const today = new Date();
  let startDate = null;

  switch (period) {
    case "Today":
      startDate = new Date(today.setHours(0, 0, 0, 0));
      break;
    case "This Week":
      startDate = new Date(today.setDate(today.getDate() - today.getDay()));
      break;
    case "This Month":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    default:
      startDate = null;
      break;
  }

  if (startDate) {
    whereCondition.createdAt = { [Op.gte]: startDate };
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await ActivityLog.findAndCountAll({
    where: whereCondition,
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return {
    totalRecords: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    pageSize: limit,
    data: rows,
  };
};

// Service to fetch active employee count
exports.getActiveEmployeeCount = async (id) => {
  // Fetch count of employees created by the user
  const result = await Employee.findAll({
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("id")), "totalEmployees"],
    ],
    where: {
      created_by: id, // Count employees created by the specific user
    },
    group: ["created_by"],
    raw: true,
  });

  //   const [{ totalEmployees }] = result
  let totalEmployees = 0;
  if (result.length > 0) {
    totalEmployees = result[0].totalEmployees;
  }


  // Fetch admin details (if needed)
  const admin = await Employee.findOne({
    attributes: ["first_name", "last_name"],
    where: { created_by: id }, // Fetching the Employee Admin using req.userId
    raw: false,
  });

  console.log("admin", admin);

  return {
    name: admin ? `${admin.first_name} ${admin.last_name}` : "Unknown Admin",
    totalEmployees: totalEmployees,
  };
};

exports.getActiveDisputes = async () => {
  const activeDisputesCount = await Disputes.count({
    where: {
      status: {
        [Op.in]: ["pending", "info_requested"],
      },
    },
  });
  return activeDisputesCount;
};

exports.getResolvedDisputes = async () => {
  const solvedDisputesCount = await Disputes.count({
    where: {
      status: {
        [Op.in]: ["approved", "rejected"],
      },
    },
  });

  return solvedDisputesCount;
};


// New service method for fetching activity logs of specific types
exports.getSpecificTypeActivities = async () => {
  try {
    const activities = await ActivityLog.findAll({
      where: {
        type: ["User", "Login", "OTP Verification","Password Reset"],
      },
    });
    return activities;
  } catch (error) {
    throw new Error("Failed to fetch specific type activities");
  }
};