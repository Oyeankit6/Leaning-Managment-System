import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import courseRoutes from "./routes/course.routes.js";

import userRoutes from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import miscRoutes from "./routes/miscellaneous.routes.js";

const app = express();

app.use(
  express.json({
    limit: "20mb",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://learningmangemnt.netlify.app/",
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
app.use("/api/v1", miscRoutes);
// ✅ Fallback Route
app.all("/:id", (req, res) => {
  res.status(404).send("OOPS!! 404 Page not found");
});

//Generic error handler middleware

app.use(errorMiddleware);

export default app;
