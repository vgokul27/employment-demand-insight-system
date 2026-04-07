import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

export default function Dashboard() {
  const [skills, setSkills] = useState([]);
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/skills")
      .then(res => {
        const formatted = res.data.map(item => ({
          name: item[0],
          value: item[1]
        }));
        setSkills(formatted);
      });

    axios.get("http://localhost:5000/api/trend")
      .then(res => {
        const formatted = Object.keys(res.data).map(key => ({
          month: key,
          value: res.data[key]
        }));
        setTrend(formatted);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Dashboard
      </h1>
      <p className="text-gray-500 mb-6">
        Real-time employment market analytics and AI insights.
      </p>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        {["Trending Skills", "Active Jobs", "Companies", "AI Predictions"].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
          >
            <h2 className="text-lg text-gray-600 dark:text-gray-300">{item}</h2>
            <p className="text-2xl font-bold mt-2 text-indigo-600">
              {i === 0 ? skills.length : i === 1 ? "24.5K" : i === 2 ? "3,200" : "98.2%"}
            </p>
          </motion.div>
        ))}

      </div>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        <select className="p-2 rounded border"> <option>All Locations</option> </select>
        <select className="p-2 rounded border"> <option>All Industries</option> </select>
        <select className="p-2 rounded border"> <option>All Levels</option> </select>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="mb-3 font-semibold text-gray-700 dark:text-white">
            Trending Skills
          </h2>

          <BarChart width={400} height={300} data={skills}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </div>

        {/* LINE CHART */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="mb-3 font-semibold text-gray-700 dark:text-white">
            Job Demand Forecast
          </h2>

          <LineChart width={400} height={300} data={trend}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8b5cf6" />
          </LineChart>
        </div>

      </div>

      {/* PIE CHART */}
      <div className="bg-white dark:bg-gray-800 p-4 mt-6 rounded-xl shadow">
        <h2 className="mb-3 font-semibold text-gray-700 dark:text-white">
          Skill vs Job Matching
        </h2>

        <PieChart width={400} height={300}>
          <Pie
            data={skills.slice(0, 5)}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {skills.slice(0, 5).map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}