import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdLogout, MdClose, MdAdd } from "react-icons/md";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);

  // Skill recommendations based on role
  const skillRecommendations = {
    student: [
      { name: "Data Analysis", level: "intermediate" },
      { name: "Web Development", level: "intermediate" },
      { name: "Python Programming", level: "intermediate" },
      { name: "Communication", level: "advanced" }
    ],
    employee: [
      { name: "Project Management", level: "intermediate" },
      { name: "Leadership", level: "advanced" },
      { name: "Cloud Computing", level: "beginner" },
      { name: "Advanced Analytics", level: "intermediate" }
    ]
  };

  // Skill learning URLs
  const skillURLs = {
    "Data Analysis": "https://www.coursera.org/professional-certificates/google-data-analytics",
    "Web Development": "https://www.coursera.org/search?query=web%20development",
    "Python Programming": "https://www.coursera.org/search?query=python%20programming",
    "Communication": "https://www.coursera.org/search?query=communication",
    "Project Management": "https://www.coursera.org/search?query=project%20management",
    "Leadership": "https://www.coursera.org/search?query=leadership",
    "Cloud Computing": "https://www.coursera.org/search?query=cloud%20computing",
    "Advanced Analytics": "https://www.coursera.org/search?query=advanced%20analytics"
  };

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
      setSkills(parsedUser.skills || []);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }

    setLoading(false);
  }, [navigate]);

  const getRecommendedSkills = () => {
    const userRole = user?.role?.toLowerCase() || "employee";
    return skillRecommendations[userRole] || skillRecommendations.employee;
  };

  const handleAddSkill = async () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill("");
      
      // Sync with database
      await syncSkillsWithDatabase(updatedSkills);
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    
    // Sync with database
    await syncSkillsWithDatabase(updatedSkills);
  };

  const syncSkillsWithDatabase = async (updatedSkills) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/update-skills", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ skills: updatedSkills })
      });

      if (!response.ok) {
        throw new Error("Failed to update skills");
      }

      const data = await response.json();
      
      // Update localStorage with the updated user data
      const updatedUser = { ...user, skills: data.user.skills };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error syncing skills with database:", error);
      // Optionally show a toast/notification to the user about the sync failure
    }
  };

  const handleLearnClick = (skillName) => {
    const url = skillURLs[skillName];
    if (url) {
      window.open(url, "_blank");
    }
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
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
              <p className="text-gray-600">{user.email}</p>
            </div>
          </motion.div>

          {/* SKILLS CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Skills
              </h3>

              {skills && skills.length > 0 ? (
                <div className="flex flex-wrap gap-3 mb-6">
                  {skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold group hover:bg-red-100 hover:text-red-600 transition-colors duration-300 cursor-pointer"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      {skill}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 mb-6">No skills added yet. Click "Update Skills" to add some!</p>
              )}

              <button 
                onClick={() => setShowSkillModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-all duration-300 text-sm font-semibold"
              >
                Update Skills
              </button>
            </div>
          </motion.div>

          {/* PERSONALIZED RECOMMENDATIONS CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Personalized Recommendations
              </h3>

              <div className="space-y-3">
                {getRecommendedSkills().map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{skill.name}</p>
                      <p className="text-sm text-gray-600 capitalize">
                        Level: {skill.level}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleLearnClick(skill.name)}
                      className="ml-4 px-3 py-1 bg-indigo-600 text-white rounded text-sm font-semibold hover:bg-indigo-700 transition-all duration-300 whitespace-nowrap cursor-pointer"
                    >
                      Learn
                    </button>
                  </motion.div>
                ))}
              </div>

              <p className="mt-6 text-sm text-gray-600">
                💡 Based on your role as a <span className="font-semibold capitalize">{user.role}</span>, we recommend these skills to boost your career growth.
              </p>
            </div>
          </motion.div>
        </div>

        {/* SKILLS MODAL */}
        {showSkillModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSkillModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Add a Skill</h3>
                <button
                  onClick={() => setShowSkillModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MdClose size={24} className="text-gray-600" />
                </button>
              </div>

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  placeholder="Enter a skill name..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors"
                  autoFocus
                />
                <button
                  onClick={handleAddSkill}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-semibold flex items-center gap-2 whitespace-nowrap"
                >
                  <MdAdd size={20} />
                  Add
                </button>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4 font-semibold">Current Skills:</p>
                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold group hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        {skill}
                        <span className="opacity-0 group-hover:opacity-100">✕</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No skills added yet. Add one above!</p>
                )}
              </div>

              <button
                onClick={() => setShowSkillModal(false)}
                className="w-full px-4 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-semibold"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
