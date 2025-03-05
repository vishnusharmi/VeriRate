const loginServices = require('../Services/loginServices');
const { createAuditLog } = require('./audit-controller');

exports.login = async (req, res) => {
    try {
        const loginUser = await loginServices.validateLogin(req.body);
        // console.log(loginUser.userData.dataValues);
        // const { action, entityType, entityId, performedBy, details, ipAddress }
        const userData = loginUser.userData.dataValues;
        const action = "LOGIN";
        const entityType = userData.role;
        const entityId = userData.id;
        const performedBy = "Self"
        const details = `${userData.username} is logged in ${entityType}`
        const ipAddress = req.ip || "0.0.0.0";
        const auditResponse = await createAuditLog({ action, entityType,performedBy, entityId, details, ipAddress })
        if (loginUser.statusCode) {
            return res.status(loginUser.statusCode).json({ message: loginUser.message });
        }
        const token = loginUser.jwtToken;
        return res.status(200).json({ message: 'Login successful',token, loginUser ,auditResponse});
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.otp = async (req, res) => {
  try {
    const verifyOtpResult = await loginServices.verifyOtp(req.body);

    return res.status(verifyOtpResult.statusCode).json({
      message: verifyOtpResult.message,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};


exports.forgetPassword = async (req,res) => {
    try {
        const password = await loginServices.forgettedPassword(req.body);
        res.status(password.statusCode).json({message:password.message})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};



exports.newPassword = async (req, res) => {
    try {
        const newPass = await loginServices.newPasswordCreating(req.body);
        
        if (!newPass) {
            return res.status(500).json({ error: "Unexpected error occurred" });
        }

        res.status(newPass.statusCode).json({ message: newPass.message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
