import { useState } from "react";
import { motion } from "framer-motion";
import { MdSearch, MdAutoAwesome, MdTrendingUp, MdError } from "react-icons/md";

export default function AIPrediction() {
  const [skill, setSkill] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async (e) => {
    e.preventDefault();

    if (!skill.trim()) {
      setError("Please enter a skill");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      // Call backend endpoint instead of Gemini directly
      const response = await fetch("http://localhost:5000/api/predict-skill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skill: skill.trim() }),
      });

      if (response.status === 404) {
        const data = await response.json();
        setError(data.error || "Skill not found in database");
        return;
      }

      if (response.status === 429) {
        const data = await response.json();
        const waitTime = data.retryAfter || 60;
        setError(
          `Request limit reached. The AI service is being used by other users. Please wait ${waitTime} seconds before trying again.`
        );
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch prediction");
      }

      const predictionData = await response.json();
      setPrediction(predictionData);
    } catch (err) {
      setError(
        err.message || "Failed to get prediction. Please try again later."
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case "High":
        return "text-green-500 bg-green-100";
      case "Medium":
        return "text-yellow-500 bg-yellow-100";
      case "Low":
        return "text-red-500 bg-red-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
          <MdAutoAwesome className="text-indigo-600" /> AI Skill Predictions
        </h1>
        <p className="text-lg text-gray-600">
          Leverage AI to forecast skill demand and market trends
        </p>
      </motion.div>

      {/* SEARCH SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 20 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <form
          onSubmit={handlePredict}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="relative mb-4">
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Enter a skill (e.g., Machine Learning, Python, React)..."
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin">⚙️</div>
                Analyzing with AI...
              </>
            ) : (
              <>
                <MdAutoAwesome /> Get Prediction
              </>
            )}
          </button>
        </form>

        {/* ERROR MESSAGE */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 border rounded-lg p-4 flex items-start gap-3 ${
              error.includes("not found")
                ? "bg-orange-100 border-orange-300"
                : "bg-red-100 border-red-300"
            }`}
          >
            <MdError className={`text-xl flex-shrink-0 mt-0.5 ${
              error.includes("not found") ? "text-orange-500" : "text-red-500"
            }`} />
            <div className={error.includes("not found") ? "text-orange-700" : "text-red-700"}>
              <p className="font-semibold mb-1">{error}</p>
              {error.includes("not found") && (
                <p className="text-sm opacity-90">
                  Try skills like: Python, Java, JavaScript, React, AWS, Docker, Project Management, Sales, etc.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* PREDICTION RESULTS */}
      {prediction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* FALLBACK DATA NOTICE */}
            {prediction._isFallbackData && (
              <div className="bg-blue-50 border-b-2 border-blue-200 p-4">
                <p className="text-sm text-blue-700">
                  📊 <span className="font-semibold">{prediction._message}</span> - Data derived from market analysis.
                </p>
              </div>
            )}

            {/* HEADER */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">{prediction.skill}</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-90">Current Demand:</span>
                  <span className={`px-3 py-1 rounded-full font-semibold ${getDemandColor(prediction.currentDemand).replace('text-', 'text-white ').replace('bg-', 'bg-white/20 ')}`}>
                    {prediction.currentDemand}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MdTrendingUp className="text-lg" />
                  <span className="font-semibold">{prediction.demandTrend}</span>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-8 space-y-8">
              {/* KEY METRICS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                  <p className="text-sm text-green-600 font-semibold mb-2">
                    Growth Potential
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {prediction.growthPotential}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                  <p className="text-sm text-blue-600 font-semibold mb-2">
                    Salary Range
                  </p>
                  <p className="text-2xl font-bold text-blue-700">
                    {prediction.averageSalaryRange}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                  <p className="text-sm text-purple-600 font-semibold mb-2">
                    Job Availability
                  </p>
                  <p className="text-lg font-bold text-purple-700">
                    {prediction.jobAvailability}
                  </p>
                </div>
              </div>

              {/* TOP INDUSTRIES */}
              {prediction.topIndustries && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Top Industries
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {prediction.topIndustries.map((industry, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium border border-indigo-200"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* REQUIRED SKILLS */}
              {prediction.requiredRelatedSkills && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Required Related Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {prediction.requiredRelatedSkills.map((relatedSkill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-200"
                      >
                        {relatedSkill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* FUTURE OUTLOOK */}
              {prediction.futureOutlook && (
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                  <h3 className="text-lg font-bold text-indigo-900 mb-2">
                    Future Outlook
                  </h3>
                  <p className="text-indigo-800">
                    {prediction.futureOutlook}
                  </p>
                </div>
              )}

              {/* RECOMMENDATIONS */}
              {prediction.recommendations && (
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-lg font-bold text-green-900 mb-2">
                    Recommendations
                  </h3>
                  <p className="text-green-800">
                    {prediction.recommendations}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* NEW SEARCH BUTTON */}
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setSkill("");
                setPrediction(null);
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
            >
              Search Another Skill
            </button>
          </div>
        </motion.div>
      )}

      {/* EMPTY STATE */}
      {!prediction && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-12 border border-indigo-200">
            <MdAutoAwesome className="text-5xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              AI-Powered Skill Forecasting
            </h3>
            <p className="text-gray-600">
              Enter any skill to get detailed market analysis, demand trends, salary insights, and career recommendations powered by AI.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
