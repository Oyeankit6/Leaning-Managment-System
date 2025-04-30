import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosinstance";
import { toast } from "react-hot-toast"; // <<< import toast

const initialState = {
  courseData: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch all courses
export const getAllCourses = createAsyncThunk(
  "courses/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/courses");

      // Show toast only if data is valid
      if (data?.courses?.length) {
        toast.success("Courses fetched successfully! ✅");
      } else {
        toast("No courses found");
      }

      return data.courses;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch courses ❌"
      );
      return rejectWithValue(error?.response?.data || "Something went wrong");
    }
  }
);

export const createNewCourse = createAsyncThunk(
  "course/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post("/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.promise(response, {
        loading: "Creating course...",
        success: "Course created successfully ✅",
        error: "Failed to create course ❌",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(
        error?.response?.data || "Failed to create course"
      );
    }
  }
);

// Async Thunk to update a course
export const updateCourseById = createAsyncThunk(
  "courses/updateCourseById",
  async ({ courseId, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `/courses/${courseId}`,
        updatedData
      );

      toast.success(data?.message || "Course updated successfully ✅");

      return data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update course ❌"
      );
      return rejectWithValue(error?.response?.data || "Something went wrong");
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/courses/${courseId}`, {
        withCredentials: true,
      });
      toast.success("Course deleted successfully");
      return data;
    } catch (error) {
      toast.error("Failed to delete course");
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Slice
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courseData = [...action.payload];
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseById.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally: update state.courseData with the updated course
      })
      .addCase(updateCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
