import AppError from "../utils/error.util.js";

const isLoggedin = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated , please login again", 400));
  }

  const userDetaiils = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = userDetaiils;

  next();
};

const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRole = req.user.roles;

    if (!roles.includes(currentUserRole)) {
      return next(new AppError("You do not have permissions to Do this ", 403));
    }

    next();
  };

const authorizeSubscriber = async (req, res, next) => {
  const subscription = req.user.subscription;
  const currentUserRole = req.user.roles;
  if (currentUserRole !== "ADMIN" && subscription.status !== "active") {
    return next(new AppError("Please Subscribe to  access course  ", 403));
  }
};

export { isLoggedin, authorizedRoles, authorizeSubscriber };
