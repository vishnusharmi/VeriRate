const rateLimit = require("express-rate-limit");

// Limit login attempts to 5 per 15 minutes
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per IP
  message: "Too many login attempts. Please try again later.",
  headers: true,
});
