// server.js
import dotenv from "dotenv";
dotenv.config();

import app from "./App.js";
import connectionToDB from "./config/dbConnection.js";

import Razorpay from "razorpay";

const PORT = process.env.PORT || 5000;

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.listen(PORT, async () => {
  await connectionToDB();
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
