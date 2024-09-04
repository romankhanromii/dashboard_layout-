import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
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
