import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import WeddingHallService from "../../services/weddingHallService"; // Adjust the path as needed
import WeddingHallView from "./DetailsView"; // Component to view details
import WeddingHallEdit from "./DetailsEdit"; // Component to edit details
import WeddingHallAdd from "./DetailsAdd"; // Component to add a new wedding hall

const WeddingHallList = () => {
  const [weddingHalls, setWeddingHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [viewWeddingHall, setViewWeddingHall] = useState(null);
  const [editWeddingHall, setEditWeddingHall] = useState(null);
  const [addWeddingHallVisible, setAddWeddingHallVisible] = useState(false);

  useEffect(() => {
    const fetchWeddingHalls = async () => {
      try {
        const response = await WeddingHallService.getAllWeddingHalls();
        setWeddingHalls(response);
      } catch (err) {
        setError("Failed to fetch wedding halls.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeddingHalls();
  }, []);

  const handleAdd = async (newWeddingHall) => {
    try {
      const response = await WeddingHallService.addWeddingHall(newWeddingHall);
      setWeddingHalls((prev) => [...prev, response]);
      setAddWeddingHallVisible(false);
    } catch (err) {
      setError("Failed to add wedding hall.");
    }
  };

  const handleEdit = async (updatedWeddingHall) => {
    try {
      const response = await WeddingHallService.updateWeddingHall(
        updatedWeddingHall.id,
        updatedWeddingHall
      );
      setWeddingHalls((prev) =>
        prev.map((hall) =>
          hall.id === updatedWeddingHall.id ? response : hall
        )
      );
      setEditWeddingHall(null);
    } catch (err) {
      setError("Failed to update wedding hall.");
    }
  };

  const handleView = (weddingHall) => {
    setViewWeddingHall(weddingHall);
  };

  const handleDelete = async (id) => {
    try {
      await WeddingHallService.deleteWeddingHall(id);
      setWeddingHalls((prev) => prev.filter((hall) => hall.id !== id));
    } catch (err) {
      setError("Failed to delete wedding hall.");
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  if (loading)
    return <p className="text-center mt-5">Loading wedding halls...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Wedding Hall List
      </h1>
      <button
        className="mb-4 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
        onClick={() => setAddWeddingHallVisible(true)}
      >
        Add Wedding Hall
      </button>
      <div className="overflow-x-auto">
        <div className="py-4">
          <table className="min-w-full mb-20 bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border text-left text-gray-700">ID</th>
                <th className="py-3 px-4 border text-left text-gray-700">
                  Name
                </th>
                <th className="py-3 px-4 border text-left text-gray-700">
                  Location
                </th>
                <th className="py-3 px-4 border text-left text-gray-700">
                  Capacity
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
              {weddingHalls.length > 0 ? (
                weddingHalls.map((hall) => (
                  <tr
                    key={hall.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-2 px-4 border text-center">{hall.id}</td>
                    <td className="py-2 px-4 border">{hall.name || "N/A"}</td>
                    <td className="py-2 px-4 border">
                      {hall.location || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {hall.capacity || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">{hall.price || "N/A"}</td>
                    <td className="py-2 px-4 border text-center">
                      <div className="relative">
                        <button
                          className="px-2 py-2 focus:outline-none"
                          onClick={() => toggleDropdown(hall.id)}
                        >
                          <FiMoreVertical className="text-xl text-gray-600" />
                        </button>
                        {dropdownOpen === hall.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                            <button
                              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                              onClick={() => handleView(hall)}
                            >
                              View
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                              onClick={() => setEditWeddingHall(hall)}
                            >
                              Edit
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                              onClick={() => handleDelete(hall.id)}
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
                  <td colSpan="6" className="text-center py-4">
                    No wedding halls found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {addWeddingHallVisible && (
        <WeddingHallAdd
          onAdd={handleAdd}
          onCancel={() => setAddWeddingHallVisible(false)}
        />
      )}
      {editWeddingHall && (
        <WeddingHallEdit
          weddingHall={editWeddingHall}
          onSave={handleEdit}
          onCancel={() => setEditWeddingHall(null)}
        />
      )}
      {viewWeddingHall && (
        <WeddingHallView
          weddingHall={viewWeddingHall}
          onClose={() => setViewWeddingHall(null)}
        />
      )}
    </div>
  );
};

export default WeddingHallList;
