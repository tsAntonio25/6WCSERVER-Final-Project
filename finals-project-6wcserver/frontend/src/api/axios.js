// imports
import axios from "axios";
import router from "@/router/router";

// create api with baseurl for deployment
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // env file contains url
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle expired or invalid tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403){
      localStorage.clear();

      // redirect to login
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default api;