import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo/Mianlogo.svg";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/authService";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.register(formData);
      history("/login");
    } catch (err) {
      console.log("error: ", err.message);
      setError(err.message || "Registration failed");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-[503px] min-h-fit py-6 my-2 px-8 bg-white rounded-lg shadow-md shadow-black/10">
        <img src={logo} alt="Logo" className="mx-auto mb-4" />
        <span className="block text-gray-700 text-xl font-bold mb-1">
          Sign Up
        </span>
        <p className="text-gray-600 mb-8">
          Guidance line to what to enter to create account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="name" // Match the id with formData key
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name" // Should be 'name' to match formData
                value={formData.name} // Match formData key
                onChange={handleChange}
                placeholder="John"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., Johndoe@email.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone_no" // Match the id with formData key
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_no" // Should be 'phone_no' to match formData
              value={formData.phone_no} // Match formData key
              onChange={handleChange}
              placeholder="123-456-7890"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="***********"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 top-6 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="***********"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-buttonbackground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <Link to="/login" className="text-sm text-blue-800">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
