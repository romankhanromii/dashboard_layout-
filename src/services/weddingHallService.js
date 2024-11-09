import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class WeddingHallService {
  // Create a new wedding hall detail
  static async addWeddingHall(weddingHallData) {
    try {
      const response = await axios.post(
        `${API_URL}/wedding-halls/add`,
        weddingHallData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding wedding hall:", error.response.data);
      throw error.response.data;
    }
  }

  // Get all wedding hall details
  static async getAllWeddingHalls() {
    try {
      const response = await axios.get(`${API_URL}/wedding-halls/get`);
      return response.data;
    } catch (error) {
      console.error("Error fetching wedding halls:", error.response.data);
      throw error.response.data;
    }
  }

  // Get a specific wedding hall detail by ID
  static async getWeddingHallById(id) {
    try {
      const response = await axios.get(`${API_URL}/wedding-halls/get/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching wedding hall:", error.response.data);
      throw error.response.data;
    }
  }

  // Update a specific wedding hall detail by ID
  static async updateWeddingHall(id, weddingHallData) {
    try {
      const response = await axios.put(
        `${API_URL}/wedding-halls/edit/${id}`,
        weddingHallData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating wedding hall:", error.response.data);
      throw error.response.data;
    }
  }

  // Delete a specific wedding hall detail by ID
  static async deleteWeddingHall(id) {
    try {
      await axios.delete(`${API_URL}/wedding-halls/delete/${id}`);
    } catch (error) {
      console.error("Error deleting wedding hall:", error.response.data);
      throw error.response.data;
    }
  }
}

export default WeddingHallService;
