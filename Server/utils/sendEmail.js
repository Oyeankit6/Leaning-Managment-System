// utils/sendEmail.js

import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for port 465 (SSL), false for 587 (TLS)
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      logger: true, // Logs SMTP activity
      debug: true, // More verbose logs
    });

    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: subject,
      html: message,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: ", info.response);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    throw new Error("Email sending failed: " + error.message);
  }
};

export default sendEmail;
