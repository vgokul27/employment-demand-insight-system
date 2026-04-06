import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      
      {/* LOGO */}
      <h1 className="text-xl font-bold text-indigo-600">EDIS</h1>

      {/* LINKS */}
      <div className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/skills">Skill Insights</Link>
        <Link to="/ai">AI Prediction</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/about">About</Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        
        {/* DARK MODE */}
        <button
          onClick={() => {
            setDark(!dark);
            document.documentElement.classList.toggle("dark");
          }}
          className="text-xl"
        >
          🌙
        </button>

        {/* CTA */}
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Get Started
        </button>
      </div>

    </nav>
  );
}