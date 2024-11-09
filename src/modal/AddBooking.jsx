import React, { useState } from "react";
import FoodSelector from "../components/dropdown/FoodSelector";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AddBooking = ({ onClose }) => {
  // State to store form values
  const [formValues, setFormValues] = useState({
    date: "",
    number: "",
    foodIds: [], // Change food field to an array
  });

  // Handle form input changes for non-array fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle selected foods array change from FoodSelector
  const handleFoodSelectionChange = (selectedFoods) => {
    setFormValues({
      ...formValues,
      foodIds: selectedFoods,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending form data to the API
      const response = await axios.post(`${API_URL}/bookings/add`, formValues);
      console.log("Booking added successfully:", response.data);

      // Close modal after submission
      onClose();
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };
  return (
    <div className="relative z-50 w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => onClose()}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            aria-label="Close"
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>

        <div>
          <label className="block text-gray-700">Select Date:</label>
          <input
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700">Enter Number:</label>
          <input
            type="number"
            name="number"
            placeholder="Enter number"
            value={formValues.number}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className=" text-gray-700">Select Food:</label>
          <FoodSelector onFoodChange={handleFoodSelectionChange} />{" "}
          {/* Use FoodSelector here */}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBooking;
