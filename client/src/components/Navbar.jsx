import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { GiBrain } from "react-icons/gi";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/skills", label: "Skill Insights" },
    { path: "/ai", label: "AI Prediction" },
    { path: "/profile", label: "Profile" },
    { path: "/about", label: "About" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
      
      {/* LOGO WITH ICON */}
      <div className="flex items-center gap-2">
        <GiBrain className="text-2xl text-indigo-600" />
        <h1 className="text-xl font-bold text-indigo-600">EDIS</h1>
      </div>

      {/* LINKS */}
      <div className="hidden md:flex gap-3 text-gray-700 dark:text-gray-300">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 ease-in-out ${
              isActive(link.path)
                ? "bg-indigo-600 text-white border border-indigo-700 shadow-lg"
                : "hover:bg-white/30 hover:backdrop-blur-md hover:border hover:border-indigo-400 hover:shadow-lg dark:hover:bg-gray-800/40"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        
        {/* DARK MODE */}
        <button
          onClick={() => {
            setDark(!dark);
            document.documentElement.classList.toggle("dark");
          }}
          className="text-2xl text-gray-700 dark:text-gray-300 hover:bg-white/30 hover:backdrop-blur-md hover:border-2 hover:border-indigo-400 p-2 rounded-lg transition-all duration-300 ease-in-out dark:hover:bg-gray-800/40"
          title="Toggle dark mode"
        >
          {dark ? <MdLightMode /> : <MdDarkMode />}
        </button>

        {/* CTA */}
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 hover:shadow-lg transition-all duration-300 ease-in-out">
          Get Started
        </button>
      </div>

    </nav>
  );
}