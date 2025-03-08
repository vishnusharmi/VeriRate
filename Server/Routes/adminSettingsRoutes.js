const express = require("express");
const adminSettingsController = require("../Controllers/adminSettingsController");

const router = express.Router();

// Middleware to check if user is Super Admin
const isSuperAdmin = require("../MiddleWares/isSuperAdmin");

router.get("/:adminId", isSuperAdmin, adminSettingsController.getAdminSettings);
router.put(
  "/:adminId",
  isSuperAdmin,
  adminSettingsController.updateAdminSetting
);
router.get(
  "/compliance/:adminId",
  isSuperAdmin,
  adminSettingsController.getSecurityCompliance
);

module.exports = router;
