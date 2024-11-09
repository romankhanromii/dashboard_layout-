// // MainPage.jsx
// import React, { useState } from "react";
// import AddBooking from "../../modal/AddBooking";

// const MainPage = () => {
//   const [showbooking, setShowBoooking] = useState(false);
//   function handleBooking() {
//     setShowBoooking(!showbooking);
//   }

//   return (
//     <div
//       className="relative bg-cover bg-center h-screen"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//       <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center">
//         <h1 className="text-5xl font-bold mb-4">Welcome to Our Wedding Hall</h1>
//         <p className="text-xl mb-8">
//           Celebrate your special day with us in style and elegance.
//         </p>
//         <button
//           className="px-8 py-3 bg-green-500 text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transform transition-all duration-300"
//           onClick={handleBooking}
//         >
//           Book Now
//         </button>
//       </div>

//       {/* Conditional Modal Rendering */}
//       {showbooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
//           <AddBooking onClose={() => setShowBoooking(false)} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainPage;
import React, { useState } from "react";
import AddBooking from "../../modal/AddBooking";

const MainPage = () => {
  const [showbooking, setShowBoooking] = useState(false);
  function handleBooking() {
    setShowBoooking(!showbooking);
  }

  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Wedding Hall</h1>
        <p className="text-xl mb-8">
          Celebrate your special day with us in style and elegance.
        </p>
        <button
          className="px-8 py-3 bg-green-500 text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transform transition-all duration-300"
          onClick={handleBooking}
        >
          Book Now
        </button>
      </div>

      {/* Conditional Modal Rendering */}
      {showbooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <AddBooking onClose={() => setShowBoooking(false)} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
