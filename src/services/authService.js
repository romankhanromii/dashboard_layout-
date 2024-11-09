import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class UserService {
  // Login a user
  static async login(userData) {
    try {
      const response = await axios.post(`${API_URL}/users/login`, userData);
      console.log("response data: ", response.data);

      // Save JWT token and user data (including role) to localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Logout user by clearing token and user data
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // Get the JWT token from localStorage
  static getToken() {
    return localStorage.getItem("token");
  }

  // Fetch user by ID
  static async getUserById(userId) {
    try {
      const token = this.getToken();
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default UserService;
