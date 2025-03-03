import nodemailer from "nodemailer";

// Configure your SMTP settings
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

// Generate an HTML email template
const generateEmailTemplate = (otp: number): string => `
  <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: 20px auto;">
    <h2 style="color: #4CAF50;">Welcome to Our Service!</h2>
    <p style="font-size: 16px;">Your One-Time Password (OTP) is:</p>
    <p style="font-size: 24px; font-weight: bold; color: #4CAF50;">${otp}</p>
    <p style="font-size: 14px; color: #888;">Please enter this OTP to verify your email. This code is valid for 10 minutes.</p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="font-size: 12px; color: #aaa;">If you did not request this, please ignore this email.</p>
  </div>
`;

// Function to send an email
export const sendOtp = async (to: string, otp: number): Promise<void> => {
  const mailOptions = {
    from: "Ecommerce <mesh789736@gmail.com>",
    to,
    subject: "Your OTP for Signup Verification",
    html: generateEmailTemplate(otp), // HTML email content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
