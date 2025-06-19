import { api, endpoints } from "./api";

// Types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role: "business" | "investor";
  company_name?: string;
  first_name: string;
  last_name: string;
}

export interface User {
  id: string;
  email: string;
  role: "business" | "investor";
  first_name: string;
  last_name: string;
  company_name?: string;
  phone?: string;
  address?: string;
  profile_completed: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ProfileUpdateData {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  phone?: string;
  address?: string;
}

// Auth Service Class
class AuthService {
  private readonly TOKEN_KEY = "invoicey_token";
  private readonly USER_KEY = "invoicey_user";

  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(endpoints.login, data);

      // Store token and user data
      if (typeof window !== "undefined") {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
      }

      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Login failed");
    }
  }

  // Register user
  async register(data: RegisterData): Promise<{ message: string }> {
    try {
      const response = await api.post(endpoints.register, data);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Registration failed");
    }
  }

  // Get current user
  async getMe(): Promise<User> {
    try {
      const response = await api.get<User>(endpoints.me);

      // Update stored user data
      if (typeof window !== "undefined") {
        localStorage.setItem(this.USER_KEY, JSON.stringify(response));
      }

      return response;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.detail || "Failed to fetch user data",
      );
    }
  }

  // Update user profile
  async updateProfile(data: ProfileUpdateData): Promise<User> {
    try {
      const response = await api.put<User>(endpoints.updateProfile, data);

      // Update stored user data
      if (typeof window !== "undefined") {
        localStorage.setItem(this.USER_KEY, JSON.stringify(response));
      }

      return response;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.detail || "Failed to update profile",
      );
    }
  }

  // Logout user
  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      window.location.href = "/login";
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }

  // Get stored token
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Get stored user
  getUser(): User | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // Get user role
  getUserRole(): "business" | "investor" | null {
    const user = this.getUser();
    return user?.role || null;
  }

  // Check if profile is completed
  isProfileCompleted(): boolean {
    const user = this.getUser();
    return user?.profile_completed || false;
  }

  // Get redirect path based on user role and profile status
  getRedirectPath(): string {
    const user = this.getUser();

    if (!user) return "/login";

    if (!user.profile_completed) {
      return "/profile";
    }

    return user.role === "business"
      ? "/dashboard/business"
      : "/dashboard/investor";
  }

  // Refresh token (if your backend supports it)
  async refreshToken(): Promise<string> {
    try {
      const response = await api.post<{ access_token: string }>(
        endpoints.refreshToken,
      );

      if (typeof window !== "undefined") {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
      }

      return response.access_token;
    } catch (error: any) {
      this.logout();
      throw new Error("Token refresh failed");
    }
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export default
export default authService;
