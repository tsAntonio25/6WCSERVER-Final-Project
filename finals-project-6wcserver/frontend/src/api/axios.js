// imports
import axios from "axios";

// create api with baseurl for deployment
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // env file contains url
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;