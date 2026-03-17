import axios from "axios";

const API = "https://real-time-chat-back.onrender.com";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

export default axiosInstance;