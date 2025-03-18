const adminService = require("../Services/adminService");

// Get the total number of employers

const getTotalEmployers = async (req, res) => {
  try {
    const totalEmployers = await adminService.fetchTotalEmployers();
    return res.status(200).json({ totalEmployers });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching employer count", error: error.message });
  }
};

module.exports = { getTotalEmployers };
