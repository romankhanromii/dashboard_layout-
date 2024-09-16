// import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Topbar from "../../components/topbar/Topbar";
// import { Outlet } from "react-router-dom";

// const DashboardLayout = () => {
//   return (
//     <div className="flex h-screen flex-col">
//       <Topbar />
//       <div className="flex-1 flex ">
//         <Sidebar />
//         <div className="flex-1 p-6 bg-gray-100">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if the token exists, if not, navigate to login
    if (!token) {
      console.log("Token not found, redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen flex-col">
      <Topbar />
      <div className="flex-1 flex ">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
