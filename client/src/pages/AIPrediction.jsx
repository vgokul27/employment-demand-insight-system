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
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Provide a skill demand forecast for "${skill}" in the job market. Format your response as JSON with the following structure:
                    {
                      "skill": "skill name",
                      "currentDemand": "High/Medium/Low",
                      "demandTrend": "+15%",
                      "growthPotential": "High/Medium/Low",
                      "topIndustries": ["array", "of", "industries"],
                      "requiredRelatedSkills": ["array", "of", "skills"],
                      "averageSalaryRange": "$XXX,XXX - $XXX,XXX",
                      "jobAvailability": "High number of openings",
                      "futureOutlook": "Brief outlook description",
                      "recommendations": "Brief recommendations"
                    }
                    Provide only the JSON object without any additional text.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch prediction from AI");
      }

      const data = await response.json();
      const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textContent) {
        throw new Error("No response from AI");
      }

      // Parse JSON from response
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not parse AI response");
      }

      const predictionData = JSON.parse(jsonMatch[0]);
      setPrediction(predictionData);
    } catch (err) {
      setError(err.message || "Failed to get prediction. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case "High":
        return "text-green-500 bg-green-100 dark:bg-green-900/30";
      case "Medium":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
      case "Low":
        return "text-red-500 bg-red-100 dark:bg-red-900/30";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-700/30";
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-3 flex items-center justify-center gap-3">
          <MdAutoAwesome className="text-indigo-600" /> AI Skill Predictions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
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
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <div className="relative mb-4">
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Enter a skill (e.g., Machine Learning, Python, React)..."
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all duration-300"
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
            className="mt-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4 flex items-start gap-3"
          >
            <MdError className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
            <p className="text-red-700 dark:text-red-300">{error}</p>
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-2">
                    Growth Potential
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {prediction.growthPotential}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    Salary Range
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {prediction.averageSalaryRange}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-2">
                    Job Availability
                  </p>
                  <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                    {prediction.jobAvailability}
                  </p>
                </div>
              </div>

              {/* TOP INDUSTRIES */}
              {prediction.topIndustries && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Top Industries
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {prediction.topIndustries.map((industry, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium border border-indigo-200 dark:border-indigo-700"
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
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Required Related Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {prediction.requiredRelatedSkills.map((relatedSkill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        {relatedSkill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* FUTURE OUTLOOK */}
              {prediction.futureOutlook && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                  <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-2">
                    Future Outlook
                  </h3>
                  <p className="text-indigo-800 dark:text-indigo-300">
                    {prediction.futureOutlook}
                  </p>
                </div>
              )}

              {/* RECOMMENDATIONS */}
              {prediction.recommendations && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-200 mb-2">
                    Recommendations
                  </h3>
                  <p className="text-green-800 dark:text-green-300">
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
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-lg p-12 border border-indigo-200 dark:border-gray-700">
            <MdAutoAwesome className="text-5xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              AI-Powered Skill Forecasting
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter any skill to get detailed market analysis, demand trends, salary insights, and career recommendations powered by AI.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
