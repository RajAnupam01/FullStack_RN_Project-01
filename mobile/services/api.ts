import axios from "axios";
import { getTokens } from "@/utils/storage";

const BASE_URL = "http://10.122.210.197:3000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});


axiosInstance.interceptors.request.use(
  async (config) => {
    const tokens = await getTokens();

    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    return config;
  },``
  (error) => Promise.reject(error)
);

export default axiosInstance;