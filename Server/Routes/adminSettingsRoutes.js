// // const express = require("express");
// // const adminSettingsController = require("../Controllers/adminSettingsController");

// // const router = express.Router();

// // // Middleware to check if user is Super Admin
// // const isSuperAdmin = require("../MiddleWares/isSuperAdmin");

// // router.get("/:adminId", isSuperAdmin, adminSettingsController.getAdminSettings);
// // router.put(
// //   "/:adminId",
// //   isSuperAdmin,
// //   adminSettingsController.updateAdminSetting
// // );
// // router.get(
// //   "/compliance/:adminId",
// //   isSuperAdmin,
// //   adminSettingsController.getSecurityCompliance
// // );

// // module.exports = router;


// const express = require("express");
// const adminSettingsController = require("../Controllers/adminSettingsController");

// const router = express.Router();

// // Middleware to check if user is Super Admin
// const isSuperAdmin = require("../MiddleWares/isSuperAdmin");
// const verifyToken = require("../MiddleWares/verifyToken");

// // Fetch Employee Admin Settings (Only Super Admin)
// router.get("/get-settings",verifyToken, isSuperAdmin, adminSettingsController.getAdminSettings);

// // Update Employee Admin Settings (Only Super Admin)
// router.put("/update-settings",verifyToken, isSuperAdmin, adminSettingsController.updateAdminSetting);

// // Fetch Security Compliance (Only Super Admin)
// router.get(
//   "/compliance/:adminId",
//   isSuperAdmin,
//   adminSettingsController.getSecurityCompliance
// );

// module.exports = router;

const express = require("express");
const adminSettingsController = require("../Controllers/adminSettingsController");

const router = express.Router();

// Middleware to check if user is Super Admin
const isSuperAdmin = require("../MiddleWares/isSuperAdmin");
const verifyToken = require("../MiddleWares/verifyToken");

// Fetch Employee Admin Settings (Only Super Admin)
router.get("/get-settings/:adminId", verifyToken, isSuperAdmin, adminSettingsController.getAdminSettings);

// Update Employee Admin Settings (Only Super Admin)
router.put("/update-settings", verifyToken, isSuperAdmin, adminSettingsController.updateAdminSetting);

// Fetch Security Compliance (Only Super Admin)
router.get(
  "/compliance/:adminId",
  isSuperAdmin,
  adminSettingsController.getSecurityCompliance
);

module.exports = router;