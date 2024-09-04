import React from "react";

const Navmodal = ({ onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className="absolute right-0 top-full w-[181px] h-[74px] bg-gray-50 shadow-lg z-50"
      style={{
        borderRadius: "0px 0px 8px 8px",
        padding: "0px 16px",
        gap: "0px",
        opacity: 1, // Opacity set to 1 to make it visible
      }}
    >
      <div className="flex flex-col justify-center h-full">{children}</div>
    </div>
  );
};

export default Navmodal;
