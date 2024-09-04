// import { Navigate, Route, Routes } from "react-router-dom";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import DashboardLayout from "./pages/dashboard/DashboardLayout";
// import Home from "./pages/home/Home";
// import CreateStore from "./pages/createstore/CreateStore";
// import SellerCenter from "./pages/sellercenter/SellerCenter";
// import Marketing from "./pages/Marketing/Marketing";

// function App() {
//   const isAuthenticated = true; // Adjust based on actual authentication logic

//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* DashboardLayout as the layout for protected routes */}
//       <Route
//         path="/"
//         element={
//           isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
//         }
//       >
//         <Route index element={<Home />} />
//         <Route path="home" element={<Home />} />
//         <Route path="createstore" element={<CreateStore />} />
//         <Route path="sellercenter" element={<SellerCenter />} />
//         <Route path="marketing" element={<Marketing />} />
//       </Route>

//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// }

// export default App;
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Home from "./pages/home/Home";
import CreateStore from "./pages/createstore/CreateStore";
import SellerCenter from "./pages/sellercenter/SellerCenter";
import Marketing from "./pages/Marketing/Marketing";

// Replace this with your actual authentication logic
const isAuthenticated = () => {
  // Example: check if a valid token exists
  return localStorage.getItem("token") !== null;
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes with DashboardLayout */}
      <Route path="/" element={<PrivateRoute element={<DashboardLayout />} />}>
        <Route index element={<Home />} />
        <Route path="createstore" element={<CreateStore />} />
        <Route path="sellercenter" element={<SellerCenter />} />
        <Route path="marketing" element={<Marketing />} />
      </Route>

      {/* Redirect all unknown routes to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
