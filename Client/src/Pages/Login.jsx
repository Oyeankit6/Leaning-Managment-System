import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function handleLogin(event) {
    event.preventDefault();

    const { email, password } = loginData;

    if (!email || !password) {
      toast.error("Please fill all the details");
      return;
    }

    // Dispatch login action
    const response = await dispatch(login({ email, password }));

    if (response?.payload?.success) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error(response?.payload?.message || "Login failed");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleUserInput}
              placeholder="Enter your email"
              className="bg-transparent px-2 py-1 border"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleUserInput}
              placeholder="Enter your password"
              className="bg-transparent px-2 py-1 border"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          >
            Login
          </button>
          <p className="text-center text-sm mt-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-400 hover:underline hover:text-yellow-500 transition"
            >
              Signup here
            </Link>
            <br />
            <Link
              to="/forgot-password"
              className="text-sm text-yellow-400 hover:underline hover:text-yellow-500 mt-1 self-end"
            >
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Login;
