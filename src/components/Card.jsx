import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white p-3 md:p-4 lg:p-5 rounded-lg shadow-sm w-full ${className}`}>
      {children}
    </div>
  );
}