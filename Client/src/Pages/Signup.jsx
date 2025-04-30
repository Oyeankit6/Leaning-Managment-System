import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/Slices/AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignupData({ ...signupData, avatar: file });

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { fullName, email, password, avatar } = signupData;

    // ✅ Validations
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (!avatar) {
      toast.error("Please upload an avatar.");
      return;
    }

    // ✅ Create FormData to send image
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    // ✅ Dispatch action
    const response = await dispatch(createAccount(formData));

    if (response?.payload?.success) {
      toast.success("Signup successful!");
      navigate("/");
    } else {
      toast.error(response?.payload?.message || "Signup failed. Try again.");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={handleSignup}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Signup Page</h1>

          <label htmlFor="avatar" className="cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover m-auto"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto text-gray-400" />
            )}
          </label>
          <input
            type="file"
            id="avatar"
            accept=".jpg, .jpeg, .png"
            onChange={handleAvatarChange}
            className="hidden"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={signupData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="bg-transparent px-2 py-1 border"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signupData.email}
              onChange={handleInputChange}
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
              value={signupData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="bg-transparent px-2 py-1 border"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          >
            Create Account
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signup;
