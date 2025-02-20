
const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/EmployeeController");

router.post("/create-employees", employeeController.createEmployee);
router.get("/get-employees", employeeController.getAllEmployees);
router.get("/getSingle-employees/:id", employeeController.getEmployeeById);
router.put("/update-employees/:id", employeeController.updateEmployee);
router.delete("/delete-employees/:id", employeeController.deleteEmployee);

module.exports = router;
