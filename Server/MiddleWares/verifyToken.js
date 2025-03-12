const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    // Access JWT Token from Authorization Header
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: "Error", message: "Access Denied: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const secretKey = process.env.JWT_SECRET_KEY;

    // Verify Token
    jwt.verify(token, secretKey, (err, payload) => {
      if (err) {
        return res
          .status(403)
          .json({ status: "Error", message: "Invalid or expired token" });
      }
      req.userId = payload.id;
      console.log(
        `payload id ${req.userId}************************************`
      );
      next();
    });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error" });
  }
};

module.exports = verifyToken;
