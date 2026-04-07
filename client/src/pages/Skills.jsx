import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MdSearch, MdTrendingUp } from "react-icons/md";

export default function Skills() {
  const [searchTerm, setSearchTerm] = useState("");

  const skillsData = [
    {
      id: 1,
      name: "Machine Learning",
      category: "AI",
      description: "Build intelligent systems that learn from data.",
      growthTrend: "+24%",
      demand: "High",
      relatedSkills: ["Deep Learning", "NLP", "Computer Vision"]
    },
    {
      id: 2,
      name: "Cloud Computing",
      category: "Infrastructure",
      description: "Design and manage scalable cloud infrastructure.",
      growthTrend: "+18%",
      demand: "High",
      relatedSkills: ["AWS", "Azure", "GCP"]
    },
    {
      id: 3,
      name: "Cybersecurity",
      category: "Security",
      description: "Protect systems and data from cyber threats.",
      growthTrend: "+20%",
      demand: "High",
      relatedSkills: ["Penetration Testing", "SOC", "Compliance"]
    },
    {
      id: 4,
      name: "Data Engineering",
      category: "Data",
      description: "Build robust data pipelines and architectures.",
      growthTrend: "+22%",
      demand: "High",
      relatedSkills: ["ETL", "Spark", "Kafka"]
    },
    {
      id: 5,
      name: "React Development",
      category: "Frontend",
      description: "Create modern, responsive web applications.",
      growthTrend: "+15%",
      demand: "Medium",
      relatedSkills: ["TypeScript", "Next.js", "Tailwind"]
    },
    {
      id: 6,
      name: "DevOps",
      category: "Infrastructure",
      description: "Streamline development and deployment workflows.",
      growthTrend: "+17%",
      demand: "Medium",
      relatedSkills: ["Docker", "Kubernetes", "CI/CD"]
    },
    {
      id: 7,
      name: "Python",
      category: "Backend",
      description: "Versatile programming language for backend development.",
      growthTrend: "+19%",
      demand: "High",
      relatedSkills: ["Django", "FastAPI", "Flask"]
    },
    {
      id: 8,
      name: "Blockchain",
      category: "Web3",
      description: "Build decentralized applications and smart contracts.",
      growthTrend: "+12%",
      demand: "Medium",
      relatedSkills: ["Solidity", "Web3.js", "Ethereum"]
    }
  ];

  // Filter skills based on search term
  const filteredSkills = useMemo(() => {
    if (!searchTerm.trim()) return skillsData;
    
    return skillsData.filter(skill =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.relatedSkills.some(relatedSkill =>
        relatedSkill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const getDemandColor = (demand) => {
    return demand === "High" 
      ? "bg-blue-500 text-white" 
      : "bg-purple-500 text-white";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-6">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Skill Insights
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Search and explore in-demand skills across industries.
        </p>
      </motion.div>

      {/* SEARCH BAR */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <div className="relative max-w-md">
          <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search skills (e.g. Machine Learning, Cloud)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all duration-300"
          />
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Found {filteredSkills.length} skill(s)
          </p>
        )}
      </motion.div>

      {/* SKILLS GRID */}
      {filteredSkills.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              {/* TOP SECTION - Title and Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.category}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDemandColor(skill.demand)} whitespace-nowrap ml-2`}>
                  {skill.demand}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {skill.description}
              </p>

              {/* GROWTH TREND */}
              <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
                <MdTrendingUp className="text-lg" />
                <span className="font-semibold">{skill.growthTrend}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">growth trend</span>
              </div>

              {/* DIVIDER */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

              {/* RELATED SKILLS */}
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Related Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.relatedSkills.map((relatedSkill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                    >
                      {relatedSkill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No skills found matching "{searchTerm}". Try a different search term.
          </p>
        </motion.div>
      )}
    </div>
  );
}
