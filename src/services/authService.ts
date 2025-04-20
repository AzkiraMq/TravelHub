import { LoginCredentials, RegisterData, User } from "../types/auth";

// Mock user data for development purposes
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "traveler@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "traveler",
    isVerified: true,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  {
    id: "2",
    email: "guide@example.com",
    firstName: "Jane",
    lastName: "Smith",
    role: "guide",
    isVerified: true,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  },
  {
    id: "3",
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    isVerified: true,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  },
];

// In a real application, these functions would make API calls to a backend
export const authService = {
  /**
   * Login a user with email and password
   */
  login: async (credentials: LoginCredentials): Promise<User> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user with matching email
    const user = MOCK_USERS.find((u) => u.email === credentials.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // In a real app, we would verify the password here
    // For now, we'll just return the user if the email matches

    // Store auth token in localStorage
    localStorage.setItem("auth_token", `mock_token_${user.id}`);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  },

  /**
   * Register a new user
   */
  register: async (data: RegisterData): Promise<User> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user with this email already exists
    if (MOCK_USERS.some((u) => u.email === data.email)) {
      throw new Error("Email already in use");
    }

    // Create new user
    const newUser: User = {
      id: `${MOCK_USERS.length + 1}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      isVerified: false,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.firstName}`,
    };

    // In a real app, we would save this user to the database
    // For now, we'll just return the new user

    // Store auth token in localStorage
    localStorage.setItem("auth_token", `mock_token_${newUser.id}`);
    localStorage.setItem("user", JSON.stringify(newUser));

    return newUser;
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Remove auth token from localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("auth_token");
  },

  /**
   * Get the current user
   */
  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem("user");
    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  },
};
