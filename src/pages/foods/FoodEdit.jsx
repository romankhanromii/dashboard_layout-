import React, { useState } from "react";

const FoodEdit = ({ food, onSave, onCancel }) => {
  const [formData, setFormData] = useState(food);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form
        className="relative bg-white rounded-lg shadow-lg p-6 w-1/3"
        onSubmit={handleSubmit}
      >
        <button
          className="absolute top-2 right-2 text-2xl font-bold cursor-pointer focus:outline-none"
          onClick={onCancel}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Food Item</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodEdit;
