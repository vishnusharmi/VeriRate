const companyDashboard = require('../Services/companyDashboardServices');

exports.employeeAdminDashboard = async (req, res) => { 
    try {
        const totalEmployees = await companyDashboard.EmployeeAdmin()
        res.status(200).json({ message: 'Total employees fetched successfully.', totalEmployees });
    } catch (error) {
        res.status(500).json({ message: error.message || "Something went wrong." });
    }
};