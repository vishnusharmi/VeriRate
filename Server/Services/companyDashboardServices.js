const Employee = require('../Models/EmployeeModel');
const Dispute = require('../Models/disputes'); // Ensure the correct model name
const BlackList = require('../Models/blackList-model');
const Ratings = require('../Models/ratingsModel');
const { Op } = require("sequelize");

exports.EmployeeAdmin = async () => {
    try {
        const employeeCount = await Employee.count();

        // Fetch disputes from the database and filter them in JavaScript
        const allDisputes = await Dispute.findAll();
        const totalDisputes = allDisputes.filter((dis) => dis.status === "pending").length || 0;

        // Get the count of blacklisted employees
        const totalBlackList = await BlackList.count();
        const totalRatings = await Ratings.count();

        // Fetch employee records
        const employeeRecords = await Employee.findAll({
            where: {
                updated_at: {
                    [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
                },
            },
            order: [['updated_at', 'DESC']], // Sort by lastUpdated in descending order
            limit: 5, // Limit to 10 recent employees (adjust as needed)
        });

        return { employeeCount, totalDisputes, totalBlackList, totalRatings, employeeRecords };
    } catch (error) {
        throw new Error(error.message || "Something went wrong while fetching employee records.");
    }
};