const AdminSettings = require("../Models/AdminSettings");
const User = require("../Models/user");

// Fetch settings for a selected admin
exports.getAdminSettings = async (req, res) => {
  try {
    const { adminId } = req.params;
    const requestingUser = await User.findByPk(adminId);

    // Ensure only Super Admin can access settings
    if (!requestingUser || requestingUser.role !== "Super Admin") {
      return res.status(403).json({
        message: "Unauthorized: Only Super Admins can manage settings.",
      });
    }

    // Ensure Employee Admin exists
    const admin = await User.findOne({
      where: { id: adminId, role: "Employee Admin" },
    });
    if (!admin) {
      return res.status(404).json({ message: "Employee Admin not found" });
    }

    let settings = await AdminSettings.findOne({ where: { adminId } });

    // If settings don't exist, create default settings
    if (!settings) {
      // settings = await AdminSettings.create({
      //   adminId,
      //   accessControl: false,
      //   complianceCheck: true,
      //   blacklistControl: false,
      //   twoFactorAuth: false,
      //   systemMonitoring: true,
      //   performanceTracking: true,
      // });
      return res
        .status(404)
        .json({ message: "Unable to fetch the admin settings." });
    }

    return res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update an admin setting
exports.updateAdminSetting = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { settingKey, value } = req.body;
    console.log("Admin ID from the controller: ", adminId);
    console.log("Body in controller: ", req.body);

    const requestingUser = await User.findByPk(adminId);

    // Ensure only Super Admin can modify settings
    if (!requestingUser || requestingUser.role !== "Super Admin") {
      return res.status(403).json({
        message: "Unauthorized: Only Super Admins can modify settings.",
      });
    }

    // Ensure Employee Admin exists
    const admin = await User.findOne({
      where: { id: adminId, role: "Employee Admin" },
    });
    if (!admin) {
      return res.status(404).json({ message: "Employee Admin not found" });
    }

    const settings = await AdminSettings.findOne({ where: { adminId } });

    if (!settings) {
      return res.status(404).json({ message: "Admin settings not found" });
    }

    settings[settingKey] = value;
    await settings.save();

    return res
      .status(200)
      .json({ message: "Setting updated successfully", settings });
  } catch (error) {
    console.error("Error updating setting:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Security Compliance Details (Static Data)
exports.getSecurityCompliance = async (req, res) => {
  try {
    const { adminId } = req.params;

    return res.status(200).json({
      adminId,
      encryption:
        "Admin data encryption is enabled. Data is encrypted in transit and at rest.",
      securityStandards: "ISO 27001, SOC 2 Type II compliance maintained.",
    });
  } catch (error) {
    console.error("Error fetching compliance:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
