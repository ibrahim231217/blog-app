// src/components/Loading.js
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative">
        <div className="w-20 h-20 border-purple-200 border-4 rounded-full"></div>
        <div className="w-20 h-20 border-purple-600 border-t-4 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
    </div>
  );
};

export default Loading;
