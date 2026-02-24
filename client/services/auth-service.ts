import { apiClient } from "@/lib/api-client";
import { LoginDto, RegisterDto } from "@/services/types";

export const authService = {
  login: async (data: LoginDto) => {
    return apiClient("/users/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  register: async (data: RegisterDto) => {
    return apiClient("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getCurrentUser: async () => {
    const res = await apiClient("/users/me");
    return res.data;
  },

  logout: async () => {
    return apiClient("/users/logout", { method: "POST" });
  },
};
