const Company = require("../Models/companies");
const  userModel  = require("../Models/user");
const disputes = require("../Models/disputes")
const blackList = require("../Models/blackList-model");

// Fetch total number of employers
const fetchTotalEmployers = async () => {
  try {
    const employees = await userModel.findAll();
    const companies =await Company.count();
    const blacklist = await blackList.count();
    const dispute = await disputes.count();

    const totalEmployees = employees.filter((emp)=>emp.role === "Employee" ).length || 0;
    const totalEmployeeAdmins = employees.filter((emp)=>emp.role === "Employee Admin").length || 0;
  

    return {totalEmployees,totalEmployeeAdmins,companies,blacklist,dispute};
  } catch (error) {
    throw new Error("Failed to fetch employer count: " + error.message);
  }
};

module.exports = { fetchTotalEmployers };
