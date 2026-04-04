import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
