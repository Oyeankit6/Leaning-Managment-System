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

    return (await res).data;
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

      // Save data to localStorage
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", finalRes.data.role || "user");
      localStorage.setItem("data", JSON.stringify(finalRes.data));

      return finalRes.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = "";
      state.data = {};
      localStorage.clear();
      toast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.data = action.payload;
        state.role = action.payload.role || "user";

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action.payload.role || "user");
        localStorage.setItem("data", JSON.stringify(action.payload));
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.data = action.payload;
        state.role = action.payload.role || "user";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
