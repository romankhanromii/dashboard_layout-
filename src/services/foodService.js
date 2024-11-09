import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class FoodService {
  // Add a new food item
  static async addFood(foodData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/foods/add`, foodData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Get all food items
  static async getAllFoods() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/foods/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Get food item by ID
  static async getFoodById(foodId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/foods/get/${foodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Update food item by ID
  static async updateFood(foodId, updateData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/foods/edit/${foodId}`,
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

  // Delete food item by ID
  static async deleteFood(foodId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${API_URL}/foods/delete/${foodId}`, {
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

export default FoodService;
