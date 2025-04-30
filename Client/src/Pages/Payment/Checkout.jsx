import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import { MdDescription, MdLock, MdSupportAgent } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import HomeLayout from "../../Layouts/HomeLayout";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const razorpaykey = useSelector((state) => state.razorpay.key);
  const subscription_id = useSelector(
    (state) => state.razorpay.subscription_id
  );
  const isPaymentVerified = useSelector(
    (state) => state.razorpay.isPaymentVerified
  );
  const userData = useSelector((state) => state?.auth?.data);

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  // Function to convert text to uppercase
  const toUppercase = (text) => {
    return text ? text.toUpperCase() : "";
  };

  async function handleSubscription(e) {
    e.preventDefault();

    console.log(razorpaykey, subscription_id);
    if (!razorpaykey || !subscription_id) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    const options = {
      key: razorpaykey,
      subscription_id: subscription_id,
      currency: "INR",
      method: {
        upi: true,
      },

      name: "Coursify Pvt Ltd",
      description: "Access to premium courses",
      theme: {
        color: "#3399cc",
      },
      prefill: {
        email: userData?.user?.email || "",
        name: userData?.user?.fullName || "",
      },

      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        toast.success("Payment Successful!");

        const res = await dispatch(verifyUserPayment(paymentDetails));

        if (res?.payload?.success) {
          navigate("/checkout/success");
        } else {
          navigate("/checkout/fail");
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    dispatch(getRazorPayId());
    dispatch(purchaseCourseBundle());
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="flex justify-center items-center min-h-[90vh] bg-black px-4">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-2xl w-full space-y-8 text-white">
          <h2 className="text-3xl font-bold text-center text-orange-400">
            Secure Your 1-Year Premium Access
          </h2>

          <div className="space-y-3 text-sm text-gray-300">
            <p>
              <span className="font-semibold text-white">Name:</span>{" "}
              {toUppercase(userData?.user?.fullName)}
            </p>
            <p>
              <span className="font-semibold text-white">Email:</span>{" "}
              {toUppercase(userData?.user?.email)}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-xl font-semibold mb-3 text-orange-300">
              What's Included
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                1-Year Unlimited Access to All Premium Courses
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Downloadable Resources & Certifications
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Access to Live Sessions & Community Support
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Priority Support & Career Mentorship
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 text-sm space-y-3">
            <div className="flex items-center gap-2">
              <MdDescription className="text-xl text-orange-400" />
              <span>
                Access to all premium courses and materials for 1 full year.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MdLock className="text-xl text-orange-400" />
              <span>100% Secure Payment Gateway powered by Razorpay.</span>
            </div>
            <div className="flex items-center gap-2">
              <MdSupportAgent className="text-xl text-orange-400" />
              <span>24/7 customer support at support@coursify.com</span>
            </div>
          </div>

          <button
            onClick={handleSubscription}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition duration-300 text-lg"
          >
            Proceed to Pay ₹999 / Year
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Checkout;
