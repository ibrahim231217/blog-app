// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../firebase/config";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-[#F9F4EC] sticky top-0 z-50 text-black shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-chokokutai font-bold text-blue-950">
              DevBlog
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="hover:text-blue-900 transition link-hover-blue"
            >
              Home
            </Link>
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-900 transition link-hover-blue"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      currentUser.photoURL || "https://via.placeholder.com/40"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <span className="text-sm">{currentUser.email}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-900 transition link-hover-blue"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-900 font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/"
              className="block py-2 text-black hover:text-blue-900 transition link-hover-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="block py-2 hover:text-blue-900 transition link-hover-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2 py-2">
                  <img
                    src={
                      currentUser.photoURL || "https://via.placeholder.com/40"
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{currentUser.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-blue-950 text-white hover:bg-blue-900 px-4 py-2 rounded-lg mt-2 w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-black hover:text-blue-900 transition link-hover-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-black hover:text-blue-900 transition link-hover-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
