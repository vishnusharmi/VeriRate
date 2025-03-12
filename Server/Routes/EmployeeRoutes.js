const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/EmployeeController");
const verifyToken = require("../MiddleWares/verifyToken");
// const { body, param } = require("express-validator"); // REMOVE LATER

// Protected Routes (Require JWT)
router.post(
  "/employee/create",
  // verifyToken,
  employeeController.createEmployee
);
router.get("/employee/all", verifyToken, employeeController.getAllEmployees);

router.get(
  "/employee/single/:id",
  // verifyToken,
  employeeController.getEmployeeById
);
router.put(
  "/employee/update/:id",
  // verifyToken,
  employeeController.updateEmployee
);
router.delete(
  "/employee/delete/:id",
  // verifyToken,
  employeeController.deleteEmployee
);

module.exports = router;
