import axios from "axios";

const BASE_URL = "https://leaning-managment-system.onrender.com/api/v1";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
