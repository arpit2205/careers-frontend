import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:4000/",
  headers: {
    Authorization: window.localStorage.getItem("jwt-token")
      ? `Bearer ${window.localStorage.getItem("jwt-token")}`
      : null,
  },
});

export default axiosInstance;
