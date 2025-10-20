const nodemailer = require("nodemailer");

async function sendOTPMail(email, otp) {
  try {
    // Using ethereal test configuration by default. Replace with real SMTP via env when ready.
    let testAccount = await nodemailer.createTestAccount();
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ethereal.email",
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER || testAccount.user,
        pass: process.env.SMTP_PASS || testAccount.pass,
      },
    });

    // Send mail
    let info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"CareerClarify" <no-reply@careerclarify.com>',
      to: email,
      subject: "Password Reset OTP - CareerClarify",
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 5 minutes only. Do not share this OTP with anyone.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You have requested to reset your password. Please use the following OTP to proceed:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p><strong>This OTP is valid for 5 minutes only.</strong></p>
          <p>If you did not request this password reset, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">Do not share this OTP with anyone.</p>
          <p style="color: #999; font-size: 12px;">© 2025 CareerClarify. All rights reserved.</p>
        </div>
      `,
    });

    console.log("OTP email sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
    return {
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = sendOTPMail;

