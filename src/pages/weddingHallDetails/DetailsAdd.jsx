import React, { useState } from "react";

const WeddingHallAdd = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Wedding Hall</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeddingHallAdd;
