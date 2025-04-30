import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import HomeLayout from "../../Layouts/HomeLayout";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// Top import area remains the same...

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedUsersCount } = useSelector(
    (state) => state.stat
  );
  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );
  const { courseData } = useSelector((state) => state.course);

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedUsersCount],
        backgroundColor: ["#facc15", "#22c55e"],
        borderColor: ["#facc15", "#22c55e"],
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: "#f87171",
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const handleCourseDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const res = await dispatch(deleteCourse(id));
      if (res.payload.success) {
        await dispatch(getAllCourses());
      }
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-6 px-4 md:px-10 text-white space-y-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-yellow-500">
          Admin Dashboard
        </h1>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Pie Chart */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className="w-full h-72">
              <Pie data={userData} />
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard
                label="Registered Users"
                value={allUsersCount}
                icon={<FaUsers />}
                iconColor="text-yellow-500"
              />
              <StatCard
                label="Subscribed Users"
                value={subscribedUsersCount}
                icon={<FaUsers />}
                iconColor="text-green-500"
              />
            </div>
          </div>

          {/* Sales Bar Chart */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className="w-full h-72 relative">
              <Bar data={salesData} className="absolute bottom-0 w-full h-72" />
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard
                label="Subscriptions Count"
                value={allPayments?.count}
                icon={<FcSalesPerformance />}
                iconColor="text-yellow-500"
              />
              <StatCard
                label="Total Revenue"
                value={allPayments?.count * 499}
                icon={<GiMoneyStack />}
                iconColor="text-green-500"
              />
            </div>
          </div>
        </div>

        {/* Courses Table Section */}
        <div className="w-full overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Courses Overview</h2>
            <button
              onClick={() =>
                navigate("/courses/create", {
                  state: {
                    initialCourseData: {
                      newCourse: true,
                      title: "",
                      category: "",
                      createdBy: "",
                      description: "",
                      thumbnail: undefined,
                      previewImage: "",
                    },
                  },
                })
              }
              className="mt-3 md:mt-0 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded shadow font-medium"
            >
              + Create New Course
            </button>
          </div>

          <table className="min-w-[900px] w-full table-auto border-collapse text-sm">
            <thead className="bg-gray-800">
              <tr>
                {[
                  "S No.",
                  "Course Title",
                  "Category",
                  "Instructor",
                  "Lectures",
                  "Description",
                  "Actions",
                ].map((heading) => (
                  <th key={heading} className="text-left p-3 border-b">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courseData?.map((course, index) => (
                <tr
                  key={course._id}
                  className="odd:bg-gray-900 even:bg-gray-800"
                >
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b max-w-[150px] truncate">
                    {course.title}
                  </td>
                  <td className="p-3 border-b max-w-[100px] truncate">
                    {course.category}
                  </td>
                  <td className="p-3 border-b max-w-[100px] truncate">
                    {course.createdBy}
                  </td>
                  <td className="p-3 border-b text-center">
                    {course.numberOfLectures}
                  </td>
                  <td className="p-3 border-b max-w-[250px] truncate">
                    {course.description}
                  </td>
                  <td className="p-3 border-b text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => navigate(`/courses/edit/${course._id}`)}
                        title="Edit"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded"
                      >
                        <MdOutlineModeEdit />
                      </button>
                      <button
                        onClick={() => handleCourseDelete(course._id)}
                        title="Delete"
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                      >
                        <BsTrash />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/courses/description/${course._id}`)
                        }
                        title="Details"
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        <BsCollectionPlayFill />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
};

// Reusable StatCard component
const StatCard = ({ label, value, icon, iconColor }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded shadow">
    <div>
      <p className="text-sm">{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
    <div className={`text-4xl ${iconColor}`}>{icon}</div>
  </div>
);

export default AdminDashboard;
