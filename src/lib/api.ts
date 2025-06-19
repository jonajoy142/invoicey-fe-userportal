import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Create axios instance
export const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("invoicey_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== "undefined") {
        localStorage.removeItem("invoicey_token");
        localStorage.removeItem("invoicey_user");
        window.location.href = "/login";
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  },
);

// API endpoints
export const endpoints = {
  // Auth endpoints
  login: "/auth/login",
  register: "/auth/register",
  me: "/auth/me",
  refreshToken: "/auth/refresh",

  // User endpoints
  updateProfile: "/users/me",
  getUserProfile: "/users/me",

  // Invoice endpoints
  uploadInvoice: "/invoices",
  getInvoices: "/invoices",
  getInvoice: (id: string) => `/invoices/${id}`,
  updateInvoice: (id: string) => `/invoices/${id}`,
  deleteInvoice: (id: string) => `/invoices/${id}`,

  // Investment endpoints
  getMarketplace: "/marketplace",
  createInvestment: "/investments",
  getInvestments: "/investments",
  getInvestment: (id: string) => `/investments/${id}`,

  // Analytics endpoints
  getDashboardStats: "/analytics/dashboard",
  getInvoiceStats: "/analytics/invoices",
  getInvestmentStats: "/analytics/investments",
};

// Helper functions for common requests
export const apiHelpers = {
  // Generic GET request
  async get<T>(url: string): Promise<T> {
    const response = await api.get(url);
    return response.data;
  },

  // Generic POST request
  async post<T>(url: string, data?: any): Promise<T> {
    const response = await api.post(url, data);
    return response.data;
  },

  // Generic PUT request
  async put<T>(url: string, data?: any): Promise<T> {
    const response = await api.put(url, data);
    return response.data;
  },

  // Generic DELETE request
  async delete<T>(url: string): Promise<T> {
    const response = await api.delete(url);
    return response.data;
  },

  // File upload helper
  async uploadFile<T>(
    url: string,
    file: File,
    additionalData?: any,
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    const response = await api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};

export default api;
