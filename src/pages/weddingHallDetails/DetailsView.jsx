import React from "react";

const WeddingHallView = ({ weddingHall, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Wedding Hall Details</h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {weddingHall.name}
          </p>
          <p>
            <span className="font-semibold">Location:</span>{" "}
            {weddingHall.location}
          </p>
          <p>
            <span className="font-semibold">Capacity:</span>{" "}
            {weddingHall.capacity}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ${weddingHall.price}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeddingHallView;
