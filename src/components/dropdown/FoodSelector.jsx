// import React, { useState, useEffect } from "react";
// import FoodService from "../../services/foodService";

// function FoodSelector({ onFoodChange }) {
//   const [foodOptions, setFoodOptions] = useState([]);
//   const [selectedFoods, setSelectedFoods] = useState([]);
//   const [guestCounts, setGuestCounts] = useState({});
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const fetchFoodOptions = async () => {
//       try {
//         const response = await FoodService.getAllFoods();
//         setFoodOptions(response);
//       } catch (error) {
//         console.error("Error fetching food options:", error);
//       }
//     };
//     fetchFoodOptions();
//   }, []);

//   const handleCheckboxChange = (event, food) => {
//     const { checked } = event.target;
//     let updatedSelectedFoods;

//     if (checked) {
//       updatedSelectedFoods = [...selectedFoods, food.id];
//     } else {
//       updatedSelectedFoods = selectedFoods.filter((id) => id !== food.id);
//       // Remove guest count if food is deselected
//       const updatedGuestCounts = { ...guestCounts };
//       delete updatedGuestCounts[food.id];
//       setGuestCounts(updatedGuestCounts);
//     }

//     setSelectedFoods(updatedSelectedFoods);
//     onFoodChange(
//       updatedSelectedFoods.map((id) => ({ id, guests: guestCounts[id] || 0 }))
//     );
//   };

//   const handleGuestCountChange = (event, foodId) => {
//     const updatedGuestCounts = {
//       ...guestCounts,
//       [foodId]: Number(event.target.value),
//     };
//     setGuestCounts(updatedGuestCounts);

//     // Update selected foods with guest counts
//     onFoodChange(
//       selectedFoods.map((id) => ({ id, guests: updatedGuestCounts[id] || 0 }))
//     );
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen((prevOpen) => !prevOpen);
//   };

//   const handleDropdownClick = (event) => {
//     event.stopPropagation();
//   };

//   return (
//     <div className="relative w-full" onClick={toggleDropdown}>
//       <button
//         type="button"
//         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//       >
//         {selectedFoods.length > 0
//           ? selectedFoods
//               .map((id) => foodOptions.find((food) => food.id === id).name)
//               .join(", ")
//           : "Select Food"}
//       </button>

//       {dropdownOpen && (
//         <div
//           className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg"
//           onClick={handleDropdownClick}
//         >
//           <div className="p-3 max-h-48 overflow-y-auto">
//             {foodOptions.map((food) => (
//               <div
//                 key={food.id}
//                 className="flex items-center p-2 transition-colors duration-200 ease-in-out rounded-md hover:bg-gray-100"
//               >
//                 <input
//                   type="checkbox"
//                   value={food.id}
//                   checked={selectedFoods.includes(food.id)}
//                   onChange={(e) => handleCheckboxChange(e, food)}
//                   className="mr-3 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
//                 />
//                 <label className="flex-grow text-gray-800">{food.name}</label>
//                 {selectedFoods.includes(food.id) && (
//                   <input
//                     type="number"
//                     placeholder="Guests"
//                     value={guestCounts[food.id] || ""}
//                     onChange={(e) => handleGuestCountChange(e, food.id)}
//                     className="w-20 px-2 py-1 ml-4 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     min="1"
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FoodSelector;
import React, { useState, useEffect, useRef } from "react";
import FoodService from "../../services/foodService";

function FoodSelector({ onFoodChange }) {
  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [guestCounts, setGuestCounts] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch food options
    const fetchFoodOptions = async () => {
      try {
        const response = await FoodService.getAllFoods();
        setFoodOptions(response);
      } catch (error) {
        console.error("Error fetching food options:", error);
      }
    };
    fetchFoodOptions();

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (event, food) => {
    const { checked } = event.target;
    let updatedSelectedFoods;

    if (checked) {
      updatedSelectedFoods = [...selectedFoods, food.id];
    } else {
      updatedSelectedFoods = selectedFoods.filter((id) => id !== food.id);
      // Remove guest count if food is deselected
      const updatedGuestCounts = { ...guestCounts };
      delete updatedGuestCounts[food.id];
      setGuestCounts(updatedGuestCounts);
    }

    setSelectedFoods(updatedSelectedFoods);
    onFoodChange(
      updatedSelectedFoods.map((id) => ({ id, guests: guestCounts[id] || 0 }))
    );
  };

  const handleGuestCountChange = (event, foodId) => {
    const updatedGuestCounts = {
      ...guestCounts,
      [foodId]: Number(event.target.value),
    };
    setGuestCounts(updatedGuestCounts);

    // Update selected foods with guest counts
    onFoodChange(
      selectedFoods.map((id) => ({ id, guests: updatedGuestCounts[id] || 0 }))
    );
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={toggleDropdown}
      >
        {selectedFoods.length > 0
          ? selectedFoods
              .map((id) => foodOptions.find((food) => food.id === id).name)
              .join(", ")
          : "Select Food"}
      </button>

      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg"
          onClick={handleDropdownClick}
        >
          <div className="p-3 max-h-48 overflow-y-auto">
            {foodOptions.map((food) => (
              <div
                key={food.id}
                className="flex items-center p-2 transition-colors duration-200 ease-in-out rounded-md hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  value={food.id}
                  checked={selectedFoods.includes(food.id)}
                  onChange={(e) => handleCheckboxChange(e, food)}
                  className="mr-3 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                />
                <label className="flex-grow text-gray-800">{food.name}</label>
                {selectedFoods.includes(food.id) && (
                  <input
                    type="number"
                    placeholder="Guests"
                    value={guestCounts[food.id] || ""}
                    onChange={(e) => handleGuestCountChange(e, food.id)}
                    className="w-20 px-2 py-1 ml-4 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    min="1"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodSelector;
