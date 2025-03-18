const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/user");
const { generateOTP, sendOTPEmail } = require("./otpServices");
const logActivity = require("../Activity/activityFunction");

exports.validateLogin = async (data) => {
  const { email, password } = data;
  const existingUser = await userModel.findOne({ where: { email } });

  if (!existingUser) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }

  const { otp } = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await existingUser.update({ otp, otpExpiresAt });

  try {
    await sendOTPEmail(email, otp);
  } catch (error) {
    throw new Error("Failed to send OTP. Try again.");
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: existingUser.id, email: existingUser.email, role: existingUser.role,name: existingUser.username},
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );

  // Log activity
  await logActivity({
    userId: existingUser.id,
    action: "User login",
    details: `User ${existingUser.username} logged in`,
    type: "Login",
    entity: "User Management",
    entityId: existingUser.id,
  });

  return {
    message: "OTP sent to email. Please verify OTP to proceed.",
    jwtToken: token,
  };
};

exports.verifyOtp = async (data) => {
  const { email, otp } = data;

  try {
    const existingOtpUser = await userModel.findOne({ where: { email } });
    if (!existingOtpUser) {
      throw new Error("User does not exist");
    }

    const isOtpValid = await bcrypt.compare(otp, existingOtpUser.otp);

    if (!(isOtpValid && new Date() < new Date(existingOtpUser.otpExpiresAt))) {
      throw new Error("Invalid or expired OTP");
    }
    await existingOtpUser.update({
      isActive: true,
      otpExpiresAt: null,
    });

    // Generate new JWT token upon successful OTP verification
    const token = jwt.sign(
      {
        id: existingOtpUser.id,
        email: existingOtpUser.email,
        role: existingOtpUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Log activity
    await logActivity({
      userId: existingOtpUser.id,
      action: "OTP verified",
      details: `User ${existingOtpUser.username} verified OTP`,
      type: "OTP Verification",
      entity: "User Management",
      entityId: existingOtpUser.id,
    });

    return {
      statusCode: 200,
      message: "OTP Verified successfully",
      jwtToken: token,
      userData: {
        id: existingOtpUser.id,
        email: existingOtpUser.email,
        role: existingOtpUser.role,
      },
    };
  } catch (error) {
    throw new Error("Internal server error FROM SERVICES");
  }
};

exports.forgettedPassword = async (data) => {
  const { email } = data;
  try {
    const existingEmail = await userModel.findOne({ where: { email } });
    if (!existingEmail) {
      throw new Error("User does not exist");
    }

    const { otp, otpExpiresAt } = generateOTP();
    //updating otp in database
    await existingEmail.update({ otp, otpExpiresAt });
    await sendOTPEmail(email, otp);

    // Log activity
    await logActivity({
      userId: existingEmail.id,
      action: "Forgot password",
      details: `User ${existingEmail.username} requested password reset`,
      type: "Password Reset",
      entity: "User Management",
      entityId: existingEmail.id,
    });

    return { statusCode: 200, message: "OTP sent to mail" };
  } catch (error) {
    throw new Error("Internal server error");
  }
};

exports.newPasswordCreating = async (data) => {
  const { email, otp, password } = data;
  try {

    if (!email || !otp || !password) {
      throw new Error("Missing required fields: email, OTP, or password");
    }

    const user = await userModel.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid or expired OTP");
    }

    // Check OTP validity
    if (!user.otp) {
      throw new Error("Invalid or expired OTP");
    }

    if (new Date() > new Date(user.otpExpiresAt)) {
      throw new Error("OTP has expired");
    }

    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid || new Date() > new Date(user.otpExpiresAt)) {
      throw new Error("Invalid or expired OTP");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and clear OTP fields
    await userModel.update({
      password: hashedPassword,
      otp: null,
      otpExpiresAt: null,
    }, {
      where: { email },
      individualHooks: true // Ensure setters are called properly
    });

    // Log activity
    await logActivity({
      userId: user.id,
      action: "Password reset",
      details: `User ${user.username} reset password`,
      type: "Password Reset",
      entity: "User Management",
      entityId: user.id,
    });

    return {
      statusCode: 201,
      message:
        "Password reset successfully. You can now log in with your new password.",
    };
  } catch (error) {
    throw error
  }
};