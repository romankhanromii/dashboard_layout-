// import React from "react";

// const Approve = ({ booking, onClose }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4">Approve Booking</h2>
//       <p>
//         <strong>Booking ID:</strong> {booking?.id}
//       </p>
//       <p>
//         <strong>Name:</strong> {booking?.user?.name}
//       </p>
//       <p>
//         <strong>Number of Guests:</strong> {booking?.no_of_guest}
//       </p>
//       <p>
//         <strong>Total Price:</strong> {booking?.total_price}
//       </p>

//       {/* Add approval button and close button */}
//       <div className="mt-4 flex justify-end">
//         <button
//           className="px-4 py-2 mr-2 bg-gray-200 rounded"
//           onClick={onClose}
//         >
//           Cancel
//         </button>
//         <button className="px-4 py-2 bg-blue-500 text-white rounded">
//           Approve Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Approve;
import React, { useState } from "react";

const Approve = ({ booking, employees, onClose, onApprove }) => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  console.log("ee", employees);

  const handleEmployeeSelect = (employeeId) => {
    setSelectedEmployees((prev) => {
      if (prev.includes(employeeId)) {
        return prev.filter((id) => id !== employeeId);
      }
      return [...prev, employeeId];
    });
  };

  const handleApproveClick = () => {
    onApprove(booking.id, selectedEmployees);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Approve Booking</h2>
      <p>
        <strong>Booking ID:</strong> {booking?.id}
      </p>
      <p>
        <strong>Name:</strong> {booking?.user?.name}
      </p>
      <p>
        <strong>Number of Guests:</strong> {booking?.no_of_guest}
      </p>
      <p>
        <strong>Total Price:</strong> {booking?.total_price}
      </p>

      {/* Employee selection */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Assign Employees:</h3>
        <ul>
          {employees?.map((employee) => (
            <li key={employee.id} className="flex items-center">
              <input
                type="checkbox"
                id={`employee-${employee.id}`}
                value={employee.id}
                checked={selectedEmployees.includes(employee.id)}
                onChange={() => handleEmployeeSelect(employee.id)}
                className="mr-2"
              />
              <label htmlFor={`employee-${employee.id}`}>
                {employee.name} ({employee.role})
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Approve and Cancel buttons */}
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 mr-2 bg-gray-200 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleApproveClick}
        >
          Approve Booking
        </button>
      </div>
    </div>
  );
};

export default Approve;
