import React, { useState, useEffect } from "react";
import logo from "../../assets/logo/Mianlogo.svg";
import Navmodal from "../../modal/Navmodal";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import UserService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const navigate = useNavigate();

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    UserService.logout();

    navigate("/login");
  };

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data
    }
  }, []);

  console.log("user: ", user);
  return (
    <header className="w-full py-4 px-4 md:px-6 bg-gray-50 shadow-md shadow-black/5 z-10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <img className="w-16 h-16" src={logo} alt="Logo" />

        {/* Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <IoMdMenu onClick={toggleMenu} className="text-2xl cursor-pointer" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <span>Theme</span>
          <span>Notification</span>

          <div className="flex items-center gap-2 relative">
            {/* Display user image and name dynamically */}
            {user ? (
              <>
                <img
                  className="w-8 h-8 object-cover rounded-full"
                  src={
                    import.meta.env.VITE_PIC_URL
                      ? `${import.meta.env.VITE_PIC_URL}user.profilePicture`
                      : "default-profile-pic-url"
                  } // Fallback to default image
                  alt="Profile"
                />
                <span className="text-gray-800">{user.name}</span>
              </>
            ) : (
              <span>Loading...</span>
            )}

            <IoIosArrowDown onClick={toggleModal} className="cursor-pointer" />

            {isModalOpen && (
              <Navmodal onClose={toggleModal}>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => alert("Settings clicked")}
                    className="text-gray-800 hover:text-blue-500"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => handleLogout()}
                    className="text-gray-800 hover:text-blue-500"
                  >
                    Logout
                  </button>
                </div>
              </Navmodal>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start mt-4 space-y-2 relative">
          <span>Theme</span>
          <span>Notification</span>

          <div className="flex items-center gap-2 relative">
            {/* Display user image and name dynamically */}
            {user ? (
              <>
                <img
                  className="w-8 h-8 object-cover rounded-full"
                  src={user.profilePicture || "default-profile-pic-url"}
                  alt="Profile"
                />
                <span className="text-gray-800">{user.name}</span>
              </>
            ) : (
              <span>Loading...</span>
            )}

            <IoIosArrowDown onClick={toggleModal} className="cursor-pointer" />

            {isModalOpen && (
              <Navmodal onClose={toggleModal}>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => alert("Settings clicked")}
                    className="text-gray-800 hover:text-blue-500"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => () => handleLogout()}
                    className="text-gray-800 hover:text-blue-500"
                  >
                    Logout
                  </button>
                </div>
              </Navmodal>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;
