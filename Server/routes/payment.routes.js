import { Router } from "express";
import {
  allPayments,
  buySceription,
  cancelSubscription,
  getRazorpayApiKey,
  verifySubscription,
} from "../controllers/payment.controller.js";
import { authorizedRoles, isLoggedin } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/razorpay-key").get(isLoggedin, getRazorpayApiKey);

router.route("/subscribe").post(isLoggedin, buySceription);

router.route("/verify").post(isLoggedin, verifySubscription);

router.route("/unsubscribe").post(isLoggedin, cancelSubscription);

router.route("/").get(isLoggedin, authorizedRoles("ADMIN"), allPayments);

export default router;
