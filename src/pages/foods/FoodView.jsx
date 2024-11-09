import React from "react";

const FoodView = ({ food, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-1/3">
        <button
          className="absolute top-2 right-2 text-2xl font-bold cursor-pointer focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{food.name}</h2>
        <img src={food.image} alt={food.name} className="w-full h-auto mb-4" />
        <p className="mb-2">
          <strong>Description:</strong> {food.description}
        </p>
        <p>
          <strong>Price:</strong> ${food.price}
        </p>
      </div>
    </div>
  );
};

export default FoodView;
