import { getTokens, removeTokens, storeToken } from "@/utils/storage"
import axios from "axios"

const BASE_URL = "http://10.145.180.197:3000/api"

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken } = await getTokens();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: any = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/register")
    ) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = await getTokens();
        if (!refreshToken) throw new Error("No refresh token available");

        // Call regenerate endpoint
        const res = await axiosInstance.get("/auth/regenerateToken", {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data.data;

        // ✅ Store both access & refresh token for rotation
        await storeToken(newAccessToken, newRefreshToken);

        // Update the request headers with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);

      } catch (err) {
        // Clear tokens on failure and redirect to login
        await removeTokens();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance
