import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import courseRoutes from "./routes/course.routes.js";

import userRoutes from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(
  express.json({
    limit: "20mb",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("Pong");
});
app.use("/api/v1/user", userRoutes);

app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
// ✅ Fallback Route
app.all("/:id", (req, res) => {
  res.status(404).send("OOPS!! 404 Page not found");
});

//Generic error handler middleware

app.use(errorMiddleware);

export default app;
