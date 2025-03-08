const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/EmployeeController");
const verifyToken = require("../MiddleWares/verifyToken");
const { body, param } = require("express-validator");

// Middleware for validating employee creation & update requests
const validateEmployee = [
  body("first_name")
    .isString()
    .notEmpty()
    .withMessage("First name is required"),
  body("last_name").isString().notEmpty().withMessage("Last name is required"),
  body("phone_number")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number format"),
  body("company_id").isInt().withMessage("Company ID must be an integer"),
  body("userId").isInt().withMessage("User ID must be an integer"),
];

// Middleware to validate employee ID in params
const validateEmployeeId = [
  param("id").isInt().withMessage("Employee ID must be an integer"),
];

// Protected Routes (Require JWT)
router.post(
  "/create",
  // verifyToken,
  validateEmployee,
  employeeController.createEmployee
);
router.get("/all",
  // verifyToken,
  employeeController.getAllEmployees);
router.get(
  "/single/:id",
  // verifyToken,
  validateEmployeeId,
  employeeController.getEmployeeById
);
router.put(
  "/update/:id",
  // verifyToken,
  validateEmployeeId,
  validateEmployee,
  employeeController.updateEmployee
);
router.delete(
  "/delete/:id",
  // verifyToken,
  validateEmployeeId,
  employeeController.deleteEmployee
);

module.exports = router;
