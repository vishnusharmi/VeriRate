// const User = require("../Models/user");

// module.exports = async (req, res, next) => {
//   try {
//     const userId = req.params.adminId; // Assume user ID comes from authentication middleware

//     const user = await User.findByPk(userId);
//     console.log(user);

//     if (!user || user.role !== "Super Admin") {
//       return res
//         .status(403)
//         .json({ message: "Unauthorized: Only Super Admins can access this" });
//     }

//     next();
//   } catch (error) {
//     console.error("Authorization error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


const User = require("../Models/user");

module.exports = async (req, res, next) => {
  try {
    const superAdminId = req.userId;
    console.log(`User ${superAdminId}****************************************`)

    if (!superAdminId) {
      return res.status(400).json({ message: "Super Admin ID is required." });
    }

    const user = await User.findByPk(superAdminId);
    if (!user) {
      return res.status(404).json({ message: "Super Admin not found." });
    }

    if (user.role !== "Super Admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only Super Admins can access this." });
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
