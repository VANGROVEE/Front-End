import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.example.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Kamu bisa menambahkan interceptor di sini (misal: untuk token)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
