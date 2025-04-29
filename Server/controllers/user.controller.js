import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import v2 from "../config/cloudinary.js";
import fs from "fs/promises";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
};

const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("Email already exists", 400));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/demo/image/upload/h_210/f_auto,q_auto/paint.jpg",
    },
  });

  if (!user) {
    return next(
      new AppError(`User registration failed , please try again later`)
    );
  }

  if (req.file) {
    try {
      // console.log(v2);

      const result = await v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
        resource_type: "auto",
        timeout: 60000,
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        console.log(result.secure_url);

        await fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      console.log(error);
      // return next(
      //   new AppError(
      //     error.message || "File not uploaded , please try again",
      //     500
      //   )
      // );
      console.log("Cloudinary upload failed, retrying...");
      return await cloudinary.v2.uploader.upload(req.file.path, {
        timeout: 60000,
      });
    }
  }

  await user.save();

  user.password = undefined;

  const token = await user.generateJWTToken();

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    message: "User registered successfully",
    user,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("Email or Password does not match", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new AppError("Email or Password does not match", 400));
    }

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "User Details",
      user,
    });
  } catch (error) {
    return next(new AppError("Failed to fetch user details", 500));
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Email not registered", 400));
  }

  const resetToken = await user.generatePasswordResetToken();

  await user.save();

  const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
    <h2 style="color: #333;">🔐 Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset your password. Click the button below to reset it. This link is valid for a limited time.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetPasswordURL}" style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Reset Your Password
      </a>
    </div>
    <p>If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="word-break: break-word; color: #555;">${resetPasswordURL}</p>
    <p style="color: #999; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email.</p>
    <p style="margin-top: 40px;">Thanks,<br/>LMS Team</p>
  </div>
  `;

  const subject = "Reset Password";

  try {
    await sendEmail(email, subject, message);

    res.status(200).json({
      success: true,
      message: `Reset password token has been sent to ${email} successfully!`,
    });
  } catch (error) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;
    await user.save();
    return next(new AppError(error.message, 400));
  }
};

const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("Token is invalid or expired, please try again", 400)
    );
  }

  user.password = password;
  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully!",
  });
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!oldPassword || !newPassword) {
    return next(new AppError("All fields are mandatory", 400));
  }

  const user = await User.findById(userId).select("+password");

  if (!user) {
    return next(new AppError("User does not exist", 400));
  }

  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid) {
    return next(new AppError("Invalid old password!", 400));
  }

  user.password = newPassword;

  await user.save();
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};

const updateUser = async (req, res, next) => {
  try {
    const { fullName } = req.body;
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User does not exist", 400));
    }

    // Update fullName if provided
    if (fullName) {
      user.fullName = fullName;
    }

    // Handle avatar upload
    if (req.file) {
      // Delete old avatar from Cloudinary
      await v2.uploader.destroy(user.avatar.public_id);

      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
          fetch_format: "auto", // Automatically choose the best format
        });

        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          // Clean up the uploaded image from local storage
          await fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        console.log(error);
        return next(new AppError("File not uploaded, please try again", 500));
      }
    }

    // Save updated user profile
    await user.save();

    res.status(200).json({
      success: true,
      message: "User profile updated successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  changePassword,
  resetPassword,
  updateUser,
};
