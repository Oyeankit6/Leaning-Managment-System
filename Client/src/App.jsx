import { Route, Routes } from "react-router-dom";
import "./App.css";

import { HomePage } from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import { CourseList } from "./Pages/Course/CourseList";
import { Contact } from "./Pages/Contact";
import { Denied } from "./Pages/Denied";
import { CourseDescription } from "./Pages/Course/CourseDescription";
import RequireAuth from "./components/Auth/RequireAuth";
import { CreateCourse } from "./Pages/Course/Createcourse";
import { Profile } from "./Pages/User/Profile";
import { EditProfile } from "./Pages/User/EditProfile";
import Checkout from "./Pages/Payment/Checkout";
import { CheckoutSuccess } from "./Pages/Payment/CheckoutSuccess";
import DisplayLectures from "./Pages/Dashboard/Displaylecture";
import AddLecture from "./Pages/Dashboard/AddLecture";
import UpdateCourseForm from "./Pages/Course/UpdateCourseForm";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import ForgotPassword from "./Pages/User/ForgetPassword";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/contactus" element={<Contact />}></Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route
          path="/courses/description"
          element={<CourseDescription />}
        ></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/courses/create" element={<CreateCourse />}></Route>
          <Route path="/courses/update" element={<UpdateCourseForm />}></Route>
          <Route path="/course/addlecture" element={<AddLecture />}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "user"]} />}>
          <Route path="/editProfile" element={<EditProfile />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/checkout/success" element={<CheckoutSuccess />}></Route>

          <Route
            path="/course/displaylecture/:id"
            element={<DisplayLectures />}
          ></Route>
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/register" element={<Signup />}></Route>

        <Route path="/Login" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
