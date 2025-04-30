import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying payment...");
  const navigate = useNavigate();

  const razorpay_payment_id = searchParams.get("razorpay_payment_id");
  const razorpay_subscription_id = searchParams.get("razorpay_subscription_id");
  const razorpay_signature = searchParams.get("razorpay_signature");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(
          "/api/payment/verify", // Adjust to your backend route
          {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
          },
          { withCredentials: true }
        );

        setMessage(data.message);
      } catch (err) {
        console.error(err);
        setMessage("Payment verification failed. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    if (razorpay_payment_id && razorpay_subscription_id && razorpay_signature) {
      verifyPayment();
    } else {
      setLoading(false);
      setMessage("Missing payment parameters.");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-6 text-center max-w-md">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          {loading ? "Processing..." : "Payment Status"}
        </h2>
        <p className="text-gray-700">{message}</p>
        {!loading && (
          <button
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => navigate("/")}
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};
