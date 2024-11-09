import React, { useState, useEffect } from "react";
import FoodService from "../../services/foodService";
import FoodView from "./FoodView";
import FoodEdit from "./FoodEdit";
import FoodAdd from "./FoodAdd";
import { FiMoreVertical } from "react-icons/fi";
const API_URL = import.meta.env.VITE_API_URL;

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [viewFood, setViewFood] = useState(null);
  const [editFood, setEditFood] = useState(null);
  const [addFoodVisible, setAddFoodVisible] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await FoodService.getAllFoods();
        setFoods(response);
      } catch (err) {
        setError("Failed to fetch food items.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleAdd = async (newFood) => {
    try {
      const response = await FoodService.addFood(newFood);
      setFoods((prev) => [...prev, response]);
      setAddFoodVisible(false);
    } catch (err) {
      setError("Failed to add food item.");
    }
  };

  const handleEdit = async (updatedFood) => {
    try {
      const response = await FoodService.updateFood(
        updatedFood.id,
        updatedFood
      );
      setFoods((prev) =>
        prev.map((food) => (food.id === updatedFood.id ? response : food))
      );
      setEditFood(null);
    } catch (err) {
      setError("Failed to update food item.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await FoodService.deleteFood(id);
      setFoods((prev) => prev.filter((food) => food.id !== id));
    } catch (err) {
      setError("Failed to delete food item.");
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  if (loading) return <p className="text-center mt-5">Loading food items...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;
  console.log("first", `${API_URL}/pictures`);
  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Food List
      </h1>
      <button
        className="mb-4 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
        onClick={() => setAddFoodVisible(true)}
      >
        Add Food
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border text-left text-gray-700">ID</th>
              <th className="py-3 px-4 border text-left text-gray-700">Name</th>
              <th className="py-3 px-4 border text-left text-gray-700">
                Description
              </th>
              <th className="py-3 px-4 border text-left text-gray-700">
                Price
              </th>
              <th className="py-3 px-4 border text-center text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {foods.length > 0 ? (
              foods.map((food) => (
                <tr
                  key={food.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-2 px-4 border text-center">{food.id}</td>
                  <td className="py-2 px-4 border">{food.name || "N/A"}</td>
                  <td className="py-2 px-4 border">
                    {food.description || "N/A"}
                  </td>
                  <td>
                    <img src={`${API_URL}/pictures/${food.image}`} alt="" />
                  </td>
                  <td className="py-2 px-4 border">{food.price || "N/A"}</td>
                  <td className="py-2 px-4 border text-center">
                    <div className="relative">
                      <button
                        className="px-2 py-2 focus:outline-none"
                        onClick={() => toggleDropdown(food.id)}
                      >
                        <FiMoreVertical className="text-xl text-gray-600" />
                      </button>
                      {dropdownOpen === food.id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                          <button
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => setViewFood(food)}
                          >
                            View
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            onClick={() => setEditFood(food)}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                            onClick={() => handleDelete(food.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No food items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {addFoodVisible && (
        <FoodAdd onAdd={handleAdd} onCancel={() => setAddFoodVisible(false)} />
      )}
      {editFood && (
        <FoodEdit
          food={editFood}
          onSave={handleEdit}
          onCancel={() => setEditFood(null)}
        />
      )}
      {viewFood && (
        <FoodView food={viewFood} onClose={() => setViewFood(null)} />
      )}
    </div>
  );
};

export default FoodList;
