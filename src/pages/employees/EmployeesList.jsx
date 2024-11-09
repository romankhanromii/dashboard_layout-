import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import EmployeeService from "../../services/employeesService";
import EmployeeView from "./EmployeeView";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeAdd from "./EmployeeAdd";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);
  const [addEmployeeVisible, setAddEmployeeVisible] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await EmployeeService.getAllEmployees();
        setEmployees(response);
      } catch (err) {
        setError("Failed to fetch employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAdd = async (newEmployee) => {
    try {
      const response = await EmployeeService.addEmployee(newEmployee);
      setEmployees((prev) => [...prev, response]);
      setAddEmployeeVisible(false);
    } catch (err) {
      setError("Failed to add employee.");
    }
  };

  const handleEdit = async (updatedEmployee) => {
    try {
      const response = await EmployeeService.updateEmployee(
        updatedEmployee.id,
        updatedEmployee
      );
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === updatedEmployee.id ? response : emp))
      );
      setEditEmployee(null);
    } catch (err) {
      setError("Failed to update employee.");
    }
  };

  const handleView = (employee) => {
    setViewEmployee(employee);
  };

  const handleDelete = async (id) => {
    try {
      await EmployeeService.deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      setError("Failed to delete employee.");
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  if (loading) return <p className="text-center mt-5">Loading employees...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Employee List
      </h1>
      <button
        className="mb-4 bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
        onClick={() => setAddEmployeeVisible(true)}
      >
        Add Employee
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
                  Role
                </th>
                <th className="py-3 px-4 border text-left text-gray-700">
                  Contact
                </th>
                <th className="py-3 px-4 border text-left text-gray-700">
                  Email
                </th>
                <th className="py-3 px-4 border text-center text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-2 px-4 border text-center">
                      {employee.id}
                    </td>
                    <td className="py-2 px-4 border">
                      {employee.name || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {employee.role || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {employee.contact || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {employee.email || "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <div className="relative">
                        <button
                          className="px-2 py-2 focus:outline-none"
                          onClick={() => toggleDropdown(employee.id)}
                        >
                          <FiMoreVertical className="text-xl text-gray-600" />
                        </button>
                        {dropdownOpen === employee.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                            <button
                              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                              onClick={() => handleView(employee)}
                            >
                              View
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                              onClick={() => setEditEmployee(employee)}
                            >
                              Edit
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                              onClick={() => handleDelete(employee.id)}
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
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {addEmployeeVisible && (
        <EmployeeAdd
          onAdd={handleAdd}
          onCancel={() => setAddEmployeeVisible(false)}
        />
      )}
      {editEmployee && (
        <EmployeeEdit
          employee={editEmployee}
          onSave={handleEdit} // Ensure this is the correct prop
          onCancel={() => setEditEmployee(null)}
        />
      )}
      {viewEmployee && (
        <EmployeeView
          employee={viewEmployee}
          onClose={() => setViewEmployee(null)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
