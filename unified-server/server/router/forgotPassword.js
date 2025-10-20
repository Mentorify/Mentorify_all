const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const sendOTPMail = require("../services/sendMail/sendOTPMail");

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper function to escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// POST /api/forgot-password/send-otp - Send OTP to user's email
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user by email (case-insensitive search)
    const emailTrimmed = email.trim();
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${escapeRegex(emailTrimmed)}$`, 'i') } 
    });

    if (!user) {
      return res.status(404).json({ message: "No user found with this email address" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // Save OTP and expiry to user
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    const emailResult = await sendOTPMail(email, otp);

    if (!emailResult.success) {
      return res.status(500).json({ 
        message: "Failed to send OTP email. Please try again later." 
      });
    }

    res.json({
      message: "OTP sent successfully to your email",
      // Include preview URL for development/testing (remove in production)
      previewUrl: emailResult.previewUrl,
    });

  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// POST /api/forgot-password/verify-otp - Verify OTP and reset password
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ 
        message: "Email, OTP, and new password are required" 
      });
    }

    if (newPassword.length < 7) {
      return res.status(400).json({ 
        message: "Password must be at least 7 characters long" 
      });
    }

    // Find user by email (case-insensitive search)
    const emailTrimmed = email.trim();
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${escapeRegex(emailTrimmed)}$`, 'i') } 
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP exists
    if (!user.otp) {
      return res.status(400).json({ 
        message: "No OTP found. Please request a new OTP." 
      });
    }

    // Check if OTP has expired
    if (new Date() > user.otpExpiry) {
      // Clear expired OTP
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(400).json({ 
        message: "OTP has expired. Please request a new OTP." 
      });
    }

    // Verify OTP
    if (user.otp !== otp.trim()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.cpassword = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ 
      message: "Password reset successful. You can now login with your new password." 
    });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;

