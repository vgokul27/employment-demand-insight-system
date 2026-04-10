import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEdit, MdLogout } from "react-icons/md";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      // Redirect to login if no token
      navigate("/login");
      return;
    }

    // Parse user data
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }

    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              {/* AVATAR */}
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* NAME */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {user.name}
              </h2>

              {/* ROLE BADGE */}
              <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4 capitalize">
                {user.role}
              </div>

              {/* EMAIL */}
              <p className="text-gray-600 mb-6">{user.email}</p>

              {/* EDIT BUTTON */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300">
                <MdEdit size={20} />
                Edit Profile
              </button>
            </div>
          </motion.div>

          {/* DETAILS SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            {/* PERSONAL INFO CARD */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Personal Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Full Name
                  </label>
                  <p className="text-lg text-gray-800">{user.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Email Address
                  </label>
                  <p className="text-lg text-gray-800">{user.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Role
                  </label>
                  <p className="text-lg text-gray-800 capitalize">{user.role}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Member Since
                  </label>
                  <p className="text-lg text-gray-800">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* SKILLS CARD */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Skills
              </h3>

              {user.skills && user.skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold hover:bg-indigo-200 transition-colors duration-300"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No skills added yet.</p>
              )}

              <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 text-sm font-semibold">
                Update Skills
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
