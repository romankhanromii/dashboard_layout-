// import React, { useEffect, useState } from "react";
// import UserBookingService from "../../services/userBooking";
// import { FiMoreVertical } from "react-icons/fi";

// const BookingRequest = () => {
//   const [bookingRequest, setBookingRequest] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPendingBooking = async () => {
//       try {
//         const response = await UserBookingService.getAllBookingPending();
//         console.log("response booking", response);
//         setBookingRequest(response.data);
//       } catch (err) {
//         setError("Failed to fetch pending booking.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPendingBooking();
//   }, []);
//   const toggleDropdown = (id) => {
//     setDropdownOpen(dropdownOpen === id ? null : id);
//   };

//   if (loading)
//     return <p className="text-center mt-5">Loading Pending Booking...</p>;
//   if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

//   return (
//     <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         Pending Booking List
//       </h1>

//       <div className="overflow-x-auto">
//         <div className="py-4">
//           <table className="min-w-full mb-20 bg-white border border-gray-300 shadow-md rounded-lg">
//             <thead className="bg-gray-200 whitespace-nowrap">
//               <tr>
//                 <th className="py-3 px-4 border text-left text-gray-700">ID</th>
//                 <th className="py-3 px-4 border text-left text-gray-700">
//                   Name
//                 </th>
//                 <th className="py-3 px-4 border text-left text-gray-700 ">
//                   Number Of Guest
//                 </th>
//                 <th className="py-3 px-4 border text-left text-gray-700">
//                   Total Price
//                 </th>
//                 <th className="py-3 px-4 border text-left text-gray-700">
//                   Food Name
//                 </th>

//                 <th className="py-3 px-4 border text-left text-gray-700">
//                   Status
//                 </th>
//                 <th className="py-3 px-4 border text-center text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookingRequest.length > 0 ? (
//                 bookingRequest.map((booking) => (
//                   <tr
//                     key={booking.id}
//                     className="hover:bg-gray-50 transition duration-200 whitespace-nowrap"
//                   >
//                     <td className="py-2 px-4 border text-center">
//                       {booking.id}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       {booking.user.name || "N/A"}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       {booking.no_of_guest || "N/A"}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       {booking.total_price || "N/A"}
//                     </td>

//                     <td className="py-2 px-4 border text-center">
//                       <select
//                         className="w-full px-2 py-1 border rounded"
//                         disabled // Disable the dropdown to make it non-editable
//                         defaultValue="" // Ensure no default selection from options
//                       >
//                         <option value="">Selected Foods</option>
//                         {booking.foods.length > 0 ? (
//                           booking.foods.map((food) => (
//                             <option key={food.id} value={food.name}>
//                               {food.name}
//                             </option>
//                           ))
//                         ) : (
//                           <option value="" disabled>
//                             No foods available
//                           </option>
//                         )}
//                       </select>
//                     </td>

//                     <td className="py-2 px-4 border">
//                       {booking.status || "N/A"}
//                     </td>
//                     <td className="py-2 px-4 border text-center">
//                       <div className="relative">
//                         <button
//                           className="px-2 py-2 focus:outline-none"
//                           onClick={() => toggleDropdown(booking.id)}
//                         >
//                           <FiMoreVertical className="text-xl text-gray-600" />
//                         </button>
//                         {dropdownOpen === booking.id && (
//                           <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
//                             <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
//                               Approve
//                             </button>
//                             <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
//                               Reject
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center py-4">
//                     No Pending Booking found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingRequest;
import React, { useEffect, useState } from "react";
import UserBookingService from "../../services/userBooking";
import EmployeeService from "../../services/employeesService";
import { FiMoreVertical } from "react-icons/fi";
import Approve from "../../modal/Approve";

const BookingRequest = () => {
  const [bookingRequest, setBookingRequest] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState({});
  const [showApprove, setShowApprove] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch pending bookings
    const fetchPendingBooking = async () => {
      try {
        const response = await UserBookingService.getAllBookingPending();
        setBookingRequest(response.data);

        // Initialize selectedFoods with first food item for each booking
        const initialSelectedFoods = response.data.reduce((acc, booking) => {
          acc[booking.id] = booking.foods.slice(0, 1);
          return acc;
        }, {});
        setSelectedFoods(initialSelectedFoods);
      } catch (err) {
        setError("Failed to fetch pending booking.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingBooking();
  }, []);

  useEffect(() => {
    // Fetch employees
    const fetchEmployees = async () => {
      try {
        const response = await EmployeeService.getAllEmployees();
        console.log("edd", response);
        setEmployees(response);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };
    fetchEmployees();
  }, []);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleFoodSelect = (food, bookingId) => {
    setSelectedFoods((prev) => {
      const updatedFoods = prev[bookingId] || [];
      if (!updatedFoods.some((selectedFood) => selectedFood.id === food.id)) {
        return { ...prev, [bookingId]: [...updatedFoods, food] };
      }
      return prev;
    });
  };

  const handleApprove = async (bookingId, selectedEmployees) => {
    try {
      // Format selectedEmployees as an array of objects with `id` and `role`
      const employeesData = selectedEmployees.map((employeeId) => {
        const employee = employees.find((emp) => emp.id === employeeId);
        return {
          employeeId: employee?.id,
          employeeRole: employee?.role,
        };
      });

      // Call the API with bookingId and formatted employee data
      await UserBookingService.approveBooking({
        bookingId,
        employees: employeesData,
      });

      // Close modal and remove approved booking from the list
      setShowApprove(false);
      setBookingRequest((prev) =>
        prev.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error("Failed to approve booking", error);
    }
  };

  const openApproveModal = (booking) => {
    setSelectedBooking(booking);
    setShowApprove(true);
  };

  if (loading)
    return <p className="text-center mt-5">Loading Pending Booking...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Pending Booking List
      </h1>

      <div className="overflow-x-auto">
        <div className="py-4">
          <table className="min-w-full mb-20 bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-200 whitespace-nowrap">
              <tr>
                <th className="py-3 px-4 border text-left text-gray-700">ID</th>
                <th className="py-3 px-4 border text-left text-gray-700">
                  Name
                </th>
                <th className="py-3 px-4 border text-left text-gray-700">
                  Number Of Guests
                </th>
                <th className="py-3 px-4 border text-left text-gray-700">
                  Total Price
                </th>
                <th className="py-3 px-4 border text-left text-gray-700">
                  Food Name
                </th>
                <th className="py-3 px-4 border text-left text-gray-700">
                  Status
                </th>
                <th className="py-3 px-4 border text-center text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingRequest.length > 0 ? (
                bookingRequest.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition duration-200 whitespace-nowrap"
                  >
                    <td className="py-2 px-4 border text-center">
                      {booking.id}
                    </td>
                    <td className="py-2 px-4 border">
                      {booking.user.name || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {booking.no_of_guest || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {booking.total_price || "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <div className="mb-2">
                        {selectedFoods[booking.id]?.length > 0 ? (
                          selectedFoods[booking.id].map((food) => (
                            <div key={food.id} className="text-gray-700">
                              {food.name}
                            </div>
                          ))
                        ) : (
                          <span>No foods selected</span>
                        )}
                      </div>
                      <select
                        className="w-full px-2 py-1 border rounded"
                        onChange={(e) => {
                          const selectedFood = booking.foods.find(
                            (food) => food.name === e.target.value
                          );
                          if (selectedFood)
                            handleFoodSelect(selectedFood, booking.id);
                        }}
                        value=""
                      >
                        <option value="" disabled>
                          Add more foods
                        </option>
                        {booking.foods
                          .filter(
                            (food) =>
                              !selectedFoods[booking.id]?.some(
                                (f) => f.id === food.id
                              )
                          )
                          .map((food) => (
                            <option key={food.id} value={food.name}>
                              {food.name}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="py-2 px-4 border">
                      {booking.status || "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <div className="relative">
                        <button
                          className="px-2 py-2 focus:outline-none"
                          onClick={() => toggleDropdown(booking.id)}
                        >
                          <FiMoreVertical className="text-xl text-gray-600" />
                        </button>
                        {dropdownOpen === booking.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                            <button
                              onClick={() => openApproveModal(booking)}
                              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            >
                              Approve
                            </button>
                            <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No Pending Booking found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showApprove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <Approve
            booking={selectedBooking}
            employees={employees}
            onClose={() => setShowApprove(false)}
            onApprove={handleApprove}
          />
        </div>
      )}
    </div>
  );
};

export default BookingRequest;
