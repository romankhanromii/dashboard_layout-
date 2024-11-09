import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class EmployeeService {
  // Add a new employee
  static async addEmployee(employeeData) {
    try {
      const token = localStorage.getItem("token"); // Assuming you are using JWT token for authorization
      const response = await axios.post(
        `${API_URL}/employees/add`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Get all employees
  static async getAllEmployees() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/employees/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Get employee by ID
  static async getEmployeeById(employeeId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/employees/get/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Update employee by ID
  static async updateEmployee(employeeId, updateData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/employees/edit/${employeeId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Delete employee by ID
  static async deleteEmployee(employeeId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${API_URL}/employees/delete/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default EmployeeService;
