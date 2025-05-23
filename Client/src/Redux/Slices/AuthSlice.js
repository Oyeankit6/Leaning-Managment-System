import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

// ✅ Signup thunk
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait! Creating your account...",
      success: (resData) => resData?.data?.message || "Account created!",
      error: "Failed to create account",
    });

    const response = await res;
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Signup failed");
    throw error;
  }
});

// ✅ Login thunk
export const login = createAsyncThunk(
  "/auth/login",
  async ({ email, password }) => {
    try {
      const res = axiosInstance.post("user/login", { email, password });

      toast.promise(res, {
        loading: "Logging in...",
        success: (resData) => resData?.data?.message || "Login successful",
        error: "Login failed",
      });

      const finalRes = await res;

      const userData = finalRes.data.user;

      // Save data to localStorage
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", userData.role || "user");
      localStorage.setItem("data", JSON.stringify(userData));

      return finalRes.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      throw error;
    }
  }
);

// ✅ Logout thunk
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = axiosInstance.get("user/logout");

    toast.promise(res, {
      loading: "Wait! Logging out...",
      success: (data) => data?.data?.message || "Logged out successfully",
      error: "Failed to log out",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Logout failed");
    throw error;
  }
});

// ✅ Edit profile thunk
export const editProfile = createAsyncThunk(
  "/auth/editProfile",
  async ({ userId, fullName, avatar }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      if (avatar) formData.append("avatar", avatar);

      const res = axiosInstance.put(`user/update/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.promise(res, {
        loading: "Updating your profile...",
        success: (resData) =>
          resData?.data?.message || "Profile updated successfully!",
        error: "Failed to update profile",
      });

      const response = await res;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// ✅ Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        const userData = action.payload.user;
        state.isLoggedIn = true;
        state.data = userData;
        state.role = userData.role;

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("data", JSON.stringify(userData));
      })
      .addCase(login.fulfilled, (state, action) => {
        const userData = action.payload.user;
        state.isLoggedIn = true;
        state.data = userData;
        state.role = userData.role;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
        localStorage.clear();
        toast.success("Logged out successfully");
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        localStorage.setItem("data", JSON.stringify(action.payload));
      });
  },
});

export default authSlice.reducer;
