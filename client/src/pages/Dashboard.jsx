import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import { motion } from "framer-motion";
import { MdTrendingUp, MdWork, MdBusiness, MdAutoAwesome, MdLightbulb, MdTrendingDown, MdLocationOn, MdBarChart, MdGpsFixed, MdLocalFireDepartment } from "react-icons/md";

const COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#f97316"];

// Location display mapping
const LOCATION_DISPLAY = {
  "all": "All Locations",
  "united_states": "Chennai",
  "india": "Bengaluru",
  "united_kingdom": "Kolkata"
};

const getLocationDisplayName = (locationValue) => {
  return LOCATION_DISPLAY[locationValue] || locationValue;
};

const stats = [
  { icon: MdTrendingUp, label: "Trending Skills", key: "skills", change: "+12%" },
  { icon: MdWork, label: "Active Jobs", value: "24.5K", change: "+8%" },
  { icon: MdBusiness, label: "Companies", value: "3,200", change: "+15%" },
  { icon: MdAutoAwesome, label: "AI Accuracy", value: "98.2%", change: "verified" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [topTrendingSkills, setTopTrendingSkills] = useState([]);
  const [highDemandSkills, setHighDemandSkills] = useState([]);
  const [trend, setTrend] = useState([]);
  const [demand, setDemand] = useState({});
  const [location, setLocation] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [experience, setExperience] = useState("all");

  useEffect(() => {

    // Get top trending skills (already includes top 10)
    axios.get(`http://localhost:5000/api/skills?location=${location}&industry=${industry}&level=${experience}`)
      .then(res => {
        console.log("Raw API response:", res.data);
        
        // Convert to format expected by charts
        const formattedTopSkills = res.data.map(item => {
          let formattedItem;
          
          if (Array.isArray(item)) {
            // Old format: [name, count]
            formattedItem = { 
              name: item[0], 
              value: item[1],
              demand_level: "High"
            };
          } else if (item.name && typeof item.count === 'number') {
            // New format: { name, count, demand_level }
            formattedItem = { 
              name: item.name, 
              value: item.count, 
              demand_level: item.demand_level || "High" 
            };
          } else {
            return null;
          }
          
          return formattedItem;
        }).filter(item => item !== null);
        
        console.log("Formatted skills:", formattedTopSkills);
        
        // All top 10 skills should have high demand
        const highDemand = formattedTopSkills.filter(skill => skill.demand_level === "High");
        console.log("High demand skills:", highDemand);
        
        setTopTrendingSkills(formattedTopSkills);
        setHighDemandSkills(highDemand);
      })
      .catch(err => console.error("Error fetching skills:", err));

    // Get trend data
    axios.get(`http://localhost:5000/api/trend?location=${location}&industry=${industry}&level=${experience}`)
      .then(res => {
        console.log("Trend data:", res.data);
        // Convert trend object to array format for LineChart
        const formatted = Object.keys(res.data).map(key => ({
          category: key,
          value: res.data[key]
        }));
        console.log("Formatted trend:", formatted);
        setTrend(formatted);
      })
      .catch(err => console.error("Error fetching trend:", err));

    // Get demand data for additional insights
    axios.get(`http://localhost:5000/api/demand?location=${location}&industry=${industry}&level=${experience}`)
      .then(res => {
        setDemand(res.data);
      })
      .catch(err => console.error("Error fetching demand:", err));
  }, [location, industry, experience]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time employment market analytics for {getLocationDisplayName(location)}</p>
      </motion.div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stat.key === "skills" ? highDemandSkills.length : stat.value}
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <span className="text-xs font-medium text-indigo-600">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FILTERS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-4"
      >
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-6 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-medium hover:border-indigo-400 focus:border-indigo-500 focus:outline-none transition-all duration-300 cursor-pointer flex items-center gap-2"
        >
          <option value="all">All Locations</option>
          <option value="united_states">Chennai</option>
          <option value="india">Bengaluru</option>
          <option value="united_kingdom">Kolkata</option>
        </select>
      </motion.div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* TRENDING SKILLS BAR CHART */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MdTrendingUp className="text-indigo-600" /> Top 10 High-Demand Skills in {getLocationDisplayName(location)}
          </h3>
          {highDemandSkills.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={highDemandSkills}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 10 }}
                  interval={0}
                />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "2px solid #6366f1",
                    borderRadius: "8px",
                    padding: "12px"
                  }}
                  formatter={(value) => [`${value.toLocaleString()} jobs`, "Active Postings"]}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[320px] flex items-center justify-center text-gray-500">
              <p>Loading skills data...</p>
            </div>
          )}
        </motion.div>

        {/* JOB DEMAND FORECAST LINE CHART */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MdTrendingUp className="text-purple-600" /> Skill Categories Trend for {getLocationDisplayName(location)}
          </h3>
          {trend.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "2px solid #8b5cf6",
                    borderRadius: "8px",
                    padding: "12px"
                  }}
                  formatter={(value) => [`${Number(value).toLocaleString()} jobs`, ""]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#6366f1", r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Job Postings"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[240px] flex items-center justify-center text-gray-500">
              <p>Loading skills data...</p>
            </div>
          )}
        </motion.div>

      </div>

      {/* DONUT CHART & AI INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* SKILL MATCHING DONUT CHART */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MdGpsFixed className="text-indigo-600" /> Top 5 Skills Distribution in {getLocationDisplayName(location)}
          </h3>
          {highDemandSkills.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={highDemandSkills.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name.substring(0, 8)}`}
                >
                  {highDemandSkills.slice(0, 5).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()} jobs`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              <p>Loading skills data...</p>
            </div>
          )}
        </motion.div>

        {/* AI INSIGHTS SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:col-span-2 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-lg border border-indigo-200"
        >
          <div className="flex items-center gap-2 mb-5">
            <MdAutoAwesome className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Top 10 Trending Skills Analysis</h3>
          </div>
          <div className="space-y-4">
            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-lg bg-white border-l-4 border-indigo-500 shadow-md hover:shadow-lg transition-all"
            >
              <p className="font-semibold text-gray-900 mb-1 flex items-center gap-2"><MdLocalFireDepartment className="text-red-500" /> #1 Most Demanded Skill</p>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-indigo-600">{highDemandSkills[0]?.name || "Loading..."}</span> leads the market with{" "}
                <span className="font-bold text-indigo-600">{highDemandSkills[0]?.value?.toLocaleString() || 0}</span> active job postings,
                making it the most sought-after skill in 2026.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-lg bg-white border-l-4 border-purple-500 shadow-md hover:shadow-lg transition-all"
            >
              <p className="font-semibold text-gray-900 mb-1 flex items-center gap-2"><MdBarChart className="text-purple-600" /> Top 10 Skills Market Share</p>
              <p className="text-sm text-gray-700">
                The top 10 high-demand skills collectively represent <span className="font-bold text-purple-600">
                  {highDemandSkills.slice(0, 10).reduce((acc, skill) => acc + skill.value, 0).toLocaleString()}
                </span> opportunities, commanding <span className="font-semibold text-purple-600">significant market demand</span> across industries.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-lg bg-white border-l-4 border-cyan-500 shadow-md hover:shadow-lg transition-all"
            >
              <p className="font-semibold text-gray-900 mb-1 flex items-center gap-2"><MdLightbulb className="text-yellow-500" /> Career Focus Strategy</p>
              <p className="text-sm text-gray-700">
                Prioritize developing expertise in <span className="font-semibold text-cyan-600">
                  {highDemandSkills.slice(0, 3).map((s) => s.name).join(", ")}
                </span> to maximize career prospects and job market competitiveness in 2026.
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}