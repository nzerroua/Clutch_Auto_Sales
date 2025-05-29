// File: src/utils/mailer.js
import nodemailer from "nodemailer";

// Create a reusable transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change to "smtp.example.com" if not using Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email utility
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Clutch Auto Sales" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html, // Optional HTML support
    });
    console.log("📧 Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
};
