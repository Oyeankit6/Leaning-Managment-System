import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isLoggedin = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 400));
  }

  // Fix the typo here: change 'JWT_SECRATE' to 'JWT_SECRET'
  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = userDetails;

  next();
};

const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRole = req.user.role; // Fixed 'roles' to 'role' (assuming it's a single role)

    if (!roles.includes(currentUserRole)) {
      return next(new AppError("You do not have permissions to do this", 403));
    }

    next();
  };

const authorizeSubscriber = async (req, res, next) => {
  try {
    const subscription = req.user.subscription;
    const currentUserRole = req.user.role;

    if (currentUserRole !== "ADMIN" && subscription?.status !== "active") {
      return next(new AppError("Please subscribe to access the course", 403));
    }

    // ✅ Allow access if checks pass
    next();
  } catch (error) {
    return next(new AppError("Authorization failed", 500));
  }
};

export { isLoggedin, authorizedRoles, authorizeSubscriber };
