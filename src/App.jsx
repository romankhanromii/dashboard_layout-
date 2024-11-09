// export default App;

import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import EmployeeList from "./pages/employees/EmployeesList";
import FoodList from "./pages/foods/FoodList";
import WeddingHallList from "./pages/weddingHallDetails/DetailsList";
import MainPage from "./pages/mainPage/MainPage";
import Login from "./pages/auth/Login"; // Assuming you have a Login component
import Signup from "./pages/auth/Signup"; // Assuming you have a Signup component
import BookingList from "./pages/booking/BookingList";
import BookingRequest from "./pages/booking/BookingRequest";

// Check if the user is authenticated and has a role
const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    return {
      authenticated: true,
      role: parsedUser.role,
    };
  }
  return {
    authenticated: false,
    role: null,
  };
};

// PrivateRoute component to protect routes based on role
const PrivateRoute = ({ role, children }) => {
  const authStatus = isAuthenticated();
  if (!authStatus.authenticated) {
    return <Navigate to="/login" />;
  }

  if (authStatus.role !== role) {
    // Redirect to main page if role does not match
    return <Navigate to="/mainpage" />;
  }

  return children ? children : <Outlet />;
};

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mainpage" element={<MainPage />} />

      {/* Protected routes for Admin */}
      <Route
        path="/"
        element={
          <PrivateRoute role="admin">
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<WeddingHallList />} />
        <Route path="foods" element={<FoodList />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="bookingrequest" element={<BookingRequest />} />
        <Route path="booking" element={<BookingList />} />
      </Route>

      {/* Catch-all route to redirect unknown paths to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;

// import { Navigate, Outlet, Route, Routes } from "react-router-dom";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import DashboardLayout from "./pages/dashboard/DashboardLayout";
// import EmployeeList from "./pages/employees/EmployeesList";
// import FoodList from "./pages/foods/FoodList";
// import WeddingHallList from "./pages/weddingHallDetails/DetailsList";
// import Topbar from "./components/topbar/Topbar";
// import MainPage from "./pages/mainPage/MainPage";

// // Function to check if the user is authenticated
// const isAuthenticated = () => {
//   return localStorage.getItem("token") !== null;
// };

// // Function to check the user's role
// const getUserRole = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user ? user.role : null;
// };

// // PrivateRoute component to protect routes for authenticated users
// const PrivateRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/login" />;
// };

// // App component containing routes
// function App() {
//   const role = getUserRole();
//   console.log("role: ", role);

//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Handle redirection based on user role */}
//       <Route
//         path="/"
//         element={
//           <Navigate
//             to={
//               isAuthenticated()
//                 ? role === "admin"
//                   ? "/dashboard"
//                   : "/mainpage"
//                 : "/login"
//             }
//           />
//         }
//       />

//       {/* Routes for customer */}
//       <Route
//         path="/mainpage"
//         element={
//           <PrivateRoute>
//             <Topbar />
//             <MainPage />
//           </PrivateRoute>
//         }
//       />

//       {/* Protected routes for admin */}
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <DashboardLayout />
//           </PrivateRoute>
//         }
//       >
//         {/* Add Outlet to render child routes here */}
//         <Route index element={<WeddingHallList />} />
//         <Route path="foods" element={<FoodList />} />
//         <Route path="employees" element={<EmployeeList />} />
//       </Route>

//       {/* Redirect all unknown routes to login */}
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// }

// export default App;
