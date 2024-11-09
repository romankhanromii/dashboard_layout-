import React from "react";

const EmployeeView = ({ employee, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <span
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-xl font-bold mb-4">Employee Details</h2>
        <div className="space-y-2">
          <p>
            <strong>ID:</strong> {employee.id}
          </p>
          <p>
            <strong>Name:</strong> {employee.name}
          </p>
          <p>
            <strong>Role:</strong> {employee.role}
          </p>
          <p>
            <strong>Contact:</strong> {employee.contact}
          </p>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeView;
