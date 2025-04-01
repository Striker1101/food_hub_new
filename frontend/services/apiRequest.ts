import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "@/util/helperFunction";
import { general_data } from "../util/general_data";

// Base URL from env
const backendUrl = general_data.backend_url;

const apiRequest = {
  get: async (path: string, options: { query?: Record<string, any> } = {}) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = buildHeaders(token);
      const response = await axios.get(buildUrl(path, options.query), {
        headers,
      });
      return response;
    } catch (error: any) {
      handleError(error);
    }
  },

  post: async (path: string, data: Record<string, any>, options: any = {}) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = buildHeaders(token);
      const response = await axios.post(`${backendUrl}${path}`, data, {
        headers,
        ...options,
      });
      return response;
    } catch (error: any) {
      handleError(error);
    }
  },

  put: async (path: string, data: Record<string, any>, options: any = {}) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = buildHeaders(token);
      const response = await axios.put(`${backendUrl}${path}`, data, {
        headers,
        ...options,
      });
      return response;
    } catch (error: any) {
      handleError(error);
    }
  },

  patch: async (path: string, data: Record<string, any>, options: any = {}) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = buildHeaders(token);
      const response = await axios.patch(`${backendUrl}${path}`, data, {
        headers,
        ...options,
      });
      return response;
    } catch (error: any) {
      handleError(error);
    }
  },

  delete: async (path: string, options: any = {}) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = buildHeaders(token);
      const response = await axios.delete(`${backendUrl}${path}`, {
        headers,
        ...options,
      });
      return response;
    } catch (error: any) {
      handleError(error);
    }
  },
};

// Helpers
const buildHeaders = (token: string | null) => ({
  Accept: "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

const buildUrl = (path: string, query?: Record<string, any>) => {
  const queryStr = query
    ? "?" +
      Object.entries(query)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&")
    : "";
  return `${backendUrl}${path}${queryStr}`;
};

const handleError = (error: any) => {
  if (error?.response?.data?.errors) {
    error.response.data.errors.forEach((err: any) => {
      showToast("error", err.msg || "Something went wrong");
    });
  } else {
    if (
      error?.response?.data?.msg == "Unauthorized. Token is invalid or expired."
    ) {
      //redirect to login
    }
    showToast("error", error?.response?.data?.msg || "Something went wrong");
  }
};

export default apiRequest;
