import React, { useState } from "react";

const EmployeeEdit = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState(employee);

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
        className="bg-white rounded-lg shadow-lg p-6 w-1/3"
        onSubmit={handleSubmit}
      >
        <span
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onCancel}
        >
          &times;
        </span>
        <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Role:</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;
