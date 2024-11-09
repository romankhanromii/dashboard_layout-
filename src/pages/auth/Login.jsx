// export default Login;
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo/Mianlogo.svg";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/authService";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await UserService.login(formData);
      history("/"); // Redirect to the dashboard or another page after successful login
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-[503px] min-h-fit py-6 my-2 px-8 bg-white rounded-lg shadow-md shadow-black/10">
        <img src={logo} alt="Logo" className="mx-auto mb-4" />
        <span className="block text-gray-700 text-xl font-bold mb-1">
          Login
        </span>
        <p className="text-gray-600 mb-8">Enter your credentials to login</p>

        <form onSubmit={handleSubmit}>
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
              className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-buttonbackground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <Link to="/signup" className="text-sm text-blue-800">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
