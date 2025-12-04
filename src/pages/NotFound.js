// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F9F4EC] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-black mb-4 animate-bounce">
          404
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-black mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off into the
          digital void.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <Link
            to="/"
            className="bg-blue-950 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
          >
            Go         Home
          </Link>
          <Link
            to="/dashboard"
            className="bg-transparent border-2 border-blue-950 text-black px-8 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition font-semibold text-lg"
          >
            Go to Dashboard
          </Link>
        </div>
        {/* <div className="mt-12 text-6xl animate-pulse"> ❓ </div> */}
      </div>
    </div>
  );
};

export default NotFound;
