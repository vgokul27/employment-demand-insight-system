const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Load ML output
const data = JSON.parse(
  fs.readFileSync("../ml/output.json", "utf-8")
);

// API ROUTES

// 1. Get Top Skills
app.get("/api/skills", (req, res) => {
  res.json(data.top_skills);
});

// 2. Get All Skill Demand
app.get("/api/demand", (req, res) => {
  res.json(data.skill_demand);
});

// 3. Get Trend Data
app.get("/api/trend", (req, res) => {
  res.json(data.trend);
});

// 4. Prediction API (Simple Logic 🔥)
app.get("/api/predict/:skill", (req, res) => {
  const skill = req.params.skill.toLowerCase();

  if (data.skill_demand[skill]) {
    const demand = data.skill_demand[skill];

    res.json({
      skill: skill,
      demand_level: demand.demand_level,
      score: demand.count,
      message: `The demand for ${skill} is ${demand.demand_level}`
    });
  } else {
    res.json({
      skill: skill,
      demand_level: "Unknown",
      score: 0,
      message: "Skill not found in dataset"
    });
  }
});


// START SERVER

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});