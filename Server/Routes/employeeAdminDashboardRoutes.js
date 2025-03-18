const express = require('express');
const dashboardRoutes = express.Router();
const dashboardControllers = require('../Controllers/comapnyDashboardController')


dashboardRoutes.get('/getRecords' , dashboardControllers.employeeAdminDashboard);


module.exports = dashboardRoutes