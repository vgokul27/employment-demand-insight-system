import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">

      {/* HERO SECTION */}
      <div className="text-center py-20 px-6">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full mb-4"
        >
          ⚡ Powered by AI & Data Analytics
        </motion.p>

        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white"
        >
          AI-Powered{" "}
          <span className="text-indigo-600">Employment</span> Demand Insight System
        </motion.h1>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Analyze job market trends, forecast skill demand, and make data-driven career decisions.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg">
            Explore Insights →
          </button>
          <button className="bg-gray-200 dark:bg-gray-700 px-6 py-3 rounded-lg">
            Get Started
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20">

        {[
          "AI-based trend detection",
          "Skill demand forecasting",
          "Smart job-skill matching"
        ].map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          >
            <h3 className="text-lg font-semibold text-indigo-600">{feature}</h3>
            <p className="text-gray-500 mt-2">
              Advanced analytics to help you understand job market trends.
            </p>
          </motion.div>
        ))}

      </div>

      {/* HOW IT WORKS */}
      <div className="px-6 pb-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {["Collect Data", "Analyze Trends", "Generate Insights"].map((step, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-indigo-600 font-bold text-lg">{step}</h3>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}