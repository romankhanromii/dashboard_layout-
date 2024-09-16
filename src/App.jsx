// import { Navigate, Route, Routes } from "react-router-dom";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import DashboardLayout from "./pages/dashboard/DashboardLayout";
// import Home from "./pages/home/Home";
// import CreateStore from "./pages/createstore/CreateStore";
// import SellerCenter from "./pages/sellercenter/SellerCenter";
// import Marketing from "./pages/Marketing/Marketing";

// // Replace this with your actual authentication logic
// const isAuthenticated = () => {
//   const token = localStorage.getItem("token");
//   console.log("Token exists:", token);
//   return token !== null;
// };

// // PrivateRoute component to protect routes
// const PrivateRoute = ({ element }) => {
//   return isAuthenticated() ? element : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Protected routes with DashboardLayout */}
//       <Route path="/" element={<PrivateRoute element={<DashboardLayout />} />}>
//         <Route index element={<Home />} />
//         <Route path="createstore" element={<CreateStore />} />
//         <Route path="sellercenter" element={<SellerCenter />} />
//         <Route path="marketing" element={<Marketing />} />
//       </Route>

//       {/* Redirect all unknown routes to login */}
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
  const token = localStorage.getItem("token");

  return token !== null;
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes inside DashboardLayout */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
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
