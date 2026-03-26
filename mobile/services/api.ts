import { getTokens, removeTokens, storeToken } from "@/utils/storage"
import axios from "axios"

export const BASE_URL = "http://10.110.85.197:3000/api"

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

    // Only retry once for 401 errors, skip login/register routes
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/register") &&
      !originalRequest.url.includes("/auth/regenerateToken")
    ) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = await getTokens();
        console.log("🔄 Trying refresh:", refreshToken);

        const res = await axios.get(`${BASE_URL}/auth/regenerateToken`, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        console.log("✅ Refresh success");

        const { accessToken, refreshToken: newRefreshToken } = res.data.data;

        await storeToken(accessToken, newRefreshToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return axiosInstance(originalRequest);

      } catch (err: any) {
        console.log("🚨 Refresh failed:", err?.response?.data || err.message);
        await removeTokens();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance
