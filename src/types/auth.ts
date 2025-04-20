export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "traveler" | "guide" | "admin";
  profileImage?: string;
  isVerified?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "traveler" | "guide";
}
