// const AdminSettings = require("../Models/AdminSettings");
// const User = require("../Models/user");

// // Fetch settings for a selected admin
// exports.getAdminSettings = async (req, res) => {
//   try {
//     const { adminId } = req.body;
//     const superAdminId  = req.userId;

//     // Ensure Employee Admin exists
//     const admin = await User.findOne({
//       where: { id: adminId, role: "Employee Admin" },
//     });
//     if (!admin) {
//       return res.status(404).json({ message: "Employee Admin not found." });
//     }

//     let settings = await AdminSettings.findOne({
//       where: { adminId, superAdminId },
//     });

//     // If settings don't exist, return an error (no auto-creation)
//     if (!settings) {
//       return res
//         .status(404)
//         .json({ message: "Unable to fetch admin settings." });
//     }

//     return res.status(200).json(settings);
//   } catch (error) {
//     console.error("Error fetching settings:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Update an admin setting
// exports.updateAdminSetting = async (req, res) => {
//   try {
//     const { adminId ,...rest} = req.body;
//     const superAdminId = req.userId;

//     // Ensure Employee Admin exists
//     const admin = await User.findOne({
//       where: { id: adminId, role: "Employee Admin" },
//     });
//     if (!admin) {
//       return res.status(404).json({ message: "Employee Admin not found." });
//     }

//     let settings = await AdminSettings.findOne({
//       where: { adminId, superAdminId },
//     });

//     if (!settings) {
//       return res.status(404).json({ message: "Admin settings not found." });
//     }

//     await AdminSettings.update(rest, { where: { adminId, superAdminId },});

//     settings = await AdminSettings.findOne({
//       where: { adminId, superAdminId },
//     });

//     return res
//       .status(200)
//       .json({ message: "Setting updated successfully" , settings});
//   } catch (error) {
//     console.error("Error updating setting:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Security Compliance Details (Static Data)
// exports.getSecurityCompliance = async (req, res) => {
//   try {
//     const { adminId } = req.params;

//     return res.status(200).json({
//       adminId,
//       encryption:
//         "Admin data encryption is enabled. Data is encrypted in transit and at rest.",
//       securityStandards: "ISO 27001, SOC 2 Type II compliance maintained.",
//     });
//   } catch (error) {
//     console.error("Error fetching compliance:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

const AdminSettings = require("../Models/AdminSettings");
const User = require("../Models/user");

// Fetch settings for a selected admin
exports.getAdminSettings = async (req, res) => {
  try {
    const { adminId } = req.params;
    const superAdminId = req.userId;

    // Ensure Employee Admin exists
    const admin = await User.findOne({
      where: { id: adminId, role: "Employee Admin" },
    });
    if (!admin) {
      return res.status(404).json({ message: "Employee Admin not found." });
    }

    let settings = await AdminSettings.findOne({
      where: { adminId, superAdminId },
    });

    // If settings don't exist, return an error (no auto-creation)
    if (!settings) {
      return res
        .status(404)
        .json({ message: "Unable to fetch admin settings." });
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
    const { adminId, ...rest } = req.body;
    const superAdminId = req.userId;

    // Ensure Employee Admin exists
    const admin = await User.findOne({
      where: { id: adminId, role: "Employee Admin" },
    });
    if (!admin) {
      return res.status(404).json({ message: "Employee Admin not found." });
    }

    let settings = await AdminSettings.findOne({
      where: { adminId, superAdminId },
    });

    if (!settings) {
      return res.status(404).json({ message: "Admin settings not found." });
    }

    await AdminSettings.update(rest, { where: { adminId, superAdminId } });

    settings = await AdminSettings.findOne({
      where: { adminId, superAdminId },
    });

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