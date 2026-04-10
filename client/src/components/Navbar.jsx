import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiBrain } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // Re-check on route change

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/skills", label: "Skill Insights" },
    { path: "/ai", label: "AI Prediction" },
    { path: "/profile", label: "Profile" },
    { path: "/about", label: "About" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      // Logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      // Navigate to login
      navigate("/login");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b border-gray-200 relative z-40">
        
        {/* LEFT SIDE - HAMBURGER + LOGO WITH ICON */}
        <div className="flex items-center gap-4">
          {/* MOBILE HAMBURGER MENU */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <FiMenu />
          </button>

          <div className="flex items-center gap-2">
            <GiBrain className="text-3xl text-indigo-600" />
            <h1 className="text-2xl font-bold text-indigo-600">EDIS</h1>
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-3 font-semibold text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 ease-in-out ${
                isActive(link.path)
                  ? "bg-indigo-100 text-indigo-600"
                  : "hover:bg-gray-100 hover:text-black hover:border-indigo-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          
          {/* DESKTOP CTA */}
          <button 
            onClick={handleGetStarted}
            className={`hidden md:block px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out font-semibold ${
              isLoggedIn
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isLoggedIn ? "Logout" : "Get Started"}
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      {isOpen && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out transform md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* CLOSE BUTTON */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <GiBrain className="text-2xl text-indigo-600" />
            <h1 className="text-xl font-bold text-indigo-600">EDIS</h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex flex-col gap-2 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={`px-4 py-3 rounded-lg transition-all duration-300 font-semibold ${
                isActive(link.path)
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* MOBILE CTA */}
        <div className="px-6 py-4">
          <button 
            onClick={handleGetStarted}
            className={`w-full px-4 py-3 rounded-lg transition-all duration-300 font-semibold ${
              isLoggedIn
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isLoggedIn ? "Logout" : "Get Started"}
          </button>
        </div>
      </div>
    </>
  );
}