const express = require('express')
const departmentControllers = require('../Controllers/department-controller')
const departmentRouter = express.Router();


departmentRouter.get('/get-department',departmentControllers.GetAlldepartments);
departmentRouter.get('/get-department/:id' , departmentControllers.GetSingleDepartment);
departmentRouter.put('/get-department/:id' , departmentControllers.UpdatingDepartment);
departmentRouter.delete('/get-department/:id' , departmentControllers.deleteDepartment);


module.exports = departmentRouter;