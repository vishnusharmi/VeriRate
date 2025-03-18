const loginServices = require('../Services/loginServices');

exports.login = async (req, res) => {
    try {
        const loginUser = await loginServices.validateLogin(req.body);
        return res.status(200).json({ message: 'Login successful', loginUser });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

exports.otp = async (req, res) => {
    try {
        const verifyOtpResult = await loginServices.verifyOtp(req.body);

        return res.status(200).json({
            message: "OTP verified successfully",
            data: verifyOtpResult,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Server error", details: error.message });
    }
};


exports.forgetPassword = async (req, res) => {
    try {
        const password = await loginServices.forgettedPassword(req.body);
        return res.status(password.statusCode).json({ message: password })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};



exports.newPassword = async (req, res) => {
    console.log("data", req.body)
    try {
        const newPass = await loginServices.newPasswordCreating(req.body);

        return res.status(newPass.statusCode).json({ message: newPass.message });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error", message:error.message});
    }
};
