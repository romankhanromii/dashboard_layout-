import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class UserBookingService {
  // Add a new booking
  static async addBooking(bookingData) {
    try {
      const token = localStorage.getItem("token"); // Assuming you are using JWT token for authorization
      const response = await axios.post(
        `${API_URL}/userBookings/add`,
        bookingData,
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

  // Get all bookings
  static async getAllBookingPending() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/bookings/get/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Get booking by ID
  static async getBookingById(bookingId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/userBookings/get/${bookingId}`,
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

  // Update booking by ID
  static async updateBooking(bookingId, updateData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/userBookings/edit/${bookingId}`,
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

  // Delete booking by ID
  static async deleteBooking(bookingId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${API_URL}/userBookings/delete/${bookingId}`,
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

  // Approve a booking
  static async approveBooking(bookingData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/bookings/approve`,
        bookingData,
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

  // Cancel a booking
  static async cancelBooking(bookingId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/userBookings/cancel/${bookingId}`,
        {},
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

export default UserBookingService;
