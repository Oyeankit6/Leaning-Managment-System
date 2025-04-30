import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your registered email.");
      return;
    }

    // Simulate API request here
    toast.success("Reset link sent to your email (simulation)");
    setEmail("");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold text-yellow-400">
            Forgot Password
          </h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Registered Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="bg-transparent px-2 py-1 border"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ForgotPassword;
