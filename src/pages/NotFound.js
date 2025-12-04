// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-white mb-4 animate-bounce">
          404
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-purple-100 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off into the
          digital void.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition font-semibold text-lg"
          >
            Go Home
          </Link>
          <Link
            to="/dashboard"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition font-semibold text-lg"
          >
            Go to Dashboard
          </Link>
        </div>
        <div className="mt-12 text-6xl animate-pulse">🔍 ❓ 📝</div>
      </div>
    </div>
  );
};

export default NotFound;
