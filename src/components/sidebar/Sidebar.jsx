import React, { useState } from "react";
import { Link } from "react-router-dom";
import home from "../../assets/logo/home.svg";
import market from "../../assets/logo/market.svg";
import sellcast from "../../assets/logo/sellcast.svg";
import store from "../../assets/logo/store.svg";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { ImUsers } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { MdOutlineRequestQuote } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle link click to close sidebar
  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex">
      {/* Sidebar for large screens */}
      <aside className="hidden md:block w-[250px] h-full bg-gray-50 border-r border-gray-200">
        <div className="p-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
              >
                <FaHome alt="Home" className="w-6 h-6" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/bookingrequest"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
              >
                <MdOutlineRequestQuote
                  alt="Booking Requests"
                  className="w-6 h-6"
                />
                <span>Booking Requests</span>
              </Link>
            </li>
            <li>
              <Link
                to="/booking"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
              >
                <TbBrandBooking alt="Bookings" className="w-6 h-6" />
                <span>Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/foods"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
              >
                <IoFastFoodSharp alt="Foods" className="w-6 h-6" />
                <span>Foods</span>
              </Link>
            </li>
            <li>
              <Link
                to="/employees"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
              >
                {/* <img src={market} alt="Employees" className="w-6 h-6" /> */}
                <ImUsers alt="Employees" className="w-6 h-6" />
                <span>Employees</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Hamburger Menu for small screens */}
      <div className="md:hidden flex   p-4">
        <IoMdMenu onClick={toggleSidebar} className="text-2xl cursor-pointer" />
      </div>

      {/* Sidebar for small screens */}
      <aside
        className={`fixed top-0 left-0 w-[250px] h-full bg-gray-50 border-r border-gray-200 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-6 relative">
          <IoMdClose
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-2xl cursor-pointer"
          />
          <ul className="space-y-4">
            <li>
              <Link
                to="/home"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
              >
                <FaHome alt="Home" className="w-6 h-6" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/createstore"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
              >
                <MdOutlineRequestQuote
                  alt="Booking Requests"
                  className="w-6 h-6"
                />
                <span>Booking Requests</span>
              </Link>
            </li>
            <li>
              <Link
                to="/sellercenter"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
              >
                <TbBrandBooking alt="Bookings" className="w-6 h-6" />
                <span>Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/foods"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
              >
                <IoFastFoodSharp alt="Foods" className="w-6 h-6" />
                <span>Foods</span>
              </Link>
            </li>
            <li>
              <Link
                to="/employees"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-gray-800 hover:text-blue-500"
              >
                <ImUsers alt="Employees" className="w-6 h-6" />
                <span>Employees</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
