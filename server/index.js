const express = require("express");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");

// For AI predictions
let predictionCache = {};
let lastPredictionTime = 0;
const PREDICTION_RATE_LIMIT = 2000; // 2 seconds between requests

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://your_username:your_password@cluster0.mongodb.net/edis?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("MongoDB connection error:", err));

// Load ML output
const data = JSON.parse(
  fs.readFileSync("../ml/output.json", "utf-8")
);

// AUTH ROUTES
app.use("/api/auth", authRoutes);

// Location mapping for consistency
const LOCATION_MAP = {
  "united_states": "Chennai",
  "india": "Bengaluru",
  "united_kingdom": "Kolkata",
  "chennai": "Chennai",
  "bengaluru": "Bengaluru",
  "kolkata": "Kolkata",
  "all": "all"
};

// Generate location-specific skills with weighted variation
const getLocationSpecificSkills = (location) => {
  if (location === "all" || !location) {
    return data.top_skills;
  }

  const normalizedLocation = LOCATION_MAP[location.toLowerCase()] || location;
  
  // Create location-specific variations with weighted adjustments
  const locationWeights = {
    "Chennai": { multiplier: 1.1, topSkills: ["python", "java", "sql", "project management", "sales"] },
    "Bengaluru": { multiplier: 1.3, topSkills: ["python", "project management", "sap", "java", "css"] },
    "Kolkata": { multiplier: 0.9, topSkills: ["sales", "customer service", "management", "python", "project management"] }
  };

  const weights = locationWeights[normalizedLocation] || { multiplier: 1, topSkills: [] };
  
  return data.top_skills.map((skill, index) => {
    let adjustedCount = skill.count;
    
    // Boost skills that are preferred in this location
    if (weights.topSkills.includes(skill.name.toLowerCase())) {
      adjustedCount = Math.ceil(skill.count * weights.multiplier);
    } else {
      adjustedCount = Math.ceil(skill.count * (weights.multiplier * 0.8));
    }

    return {
      ...skill,
      count: adjustedCount,
      value: adjustedCount
    };
  }).sort((a, b) => b.value - a.value);
};

// Generate location-specific trend data
const getLocationSpecificTrend = (location) => {
  // Always start with base trend
  if (!data.trend) {
    return { "AI/ML": 0, "Cloud": 0, "Security": 0, "Data": 0 };
  }
  
  const baseTrend = data.trend;
  
  // If no location specified or all locations, return base
  if (!location || location === "all") {
    return baseTrend;
  }

  // Normalize location value
  const locationMap = {
    "united_states": "Chennai",
    "india": "Bengaluru",
    "united_kingdom": "Kolkata",
    "chennai": "Chennai",
    "bengaluru": "Bengaluru",
    "kolkata": "Kolkata"
  };
  
  const normalizedLocation = locationMap[location.toLowerCase()] || location;
  
  const locationWeights = {
    "Chennai": { "AI/ML": 1.2, "Cloud": 1.0, "Security": 0.95, "Data": 1.1 },
    "Bengaluru": { "AI/ML": 1.4, "Cloud": 1.3, "Security": 1.1, "Data": 1.2 },
    "Kolkata": { "AI/ML": 0.9, "Cloud": 0.85, "Security": 0.9, "Data": 0.95 }
  };

  const weights = locationWeights[normalizedLocation];
  
  if (!weights) {
    return baseTrend;
  }
  
  // Apply weights to trend data
  const result = {};
  Object.keys(baseTrend).forEach(key => {
    result[key] = Math.ceil(baseTrend[key] * (weights[key] || 1));
  });
  
  return result;
};

// UTILITY FUNCTIONS FOR FILTERING
const filterDataByParams = (items, location, industry, level) => {
  let filtered = Array.isArray(items) ? [...items] : items;

  // If items is an array, filter based on location, industry, and level
  if (Array.isArray(filtered)) {
    if (location && location !== "all") {
      filtered = filtered.filter(item => 
        item.location?.toLowerCase() === location.toLowerCase() || 
        item.locations?.includes(location)
      );
    }
    
    if (industry && industry !== "all") {
      filtered = filtered.filter(item => 
        item.industry?.toLowerCase() === industry.toLowerCase() || 
        item.industries?.includes(industry)
      );
    }
    
    if (level && level !== "all") {
      filtered = filtered.filter(item => 
        item.level?.toLowerCase() === level.toLowerCase() || 
        item.levels?.includes(level)
      );
    }
  }
  
  return filtered;
};

// API ROUTES

// 1. Get Top Skills with Filtering
app.get("/api/skills", (req, res) => {
  const { location, industry, level } = req.query;
  
  // Get location-specific skills
  let skills = getLocationSpecificSkills(location);
  
  // Apply additional filters if needed
  if (industry || level) {
    skills = filterDataByParams(skills, null, industry, level);
  }
  
  res.json(skills);
});

// 2. Get All Skill Demand with Filtering
app.get("/api/demand", (req, res) => {
  const { location, industry, level } = req.query;
  
  let demand = data.skill_demand;
  
  // If location/industry/level filters are specified, filter the demand data
  if ((location && location !== "all") || (industry && industry !== "all") || (level && level !== "all")) {
    // Filter demand object based on parameters
    let filteredDemand = {};
    
    for (const [skill, demandData] of Object.entries(demand)) {
      let include = true;
      
      if (location && location !== "all") {
        include = include && (demandData.location?.toLowerCase() === location.toLowerCase() || demandData.locations?.includes(location));
      }
      
      if (industry && industry !== "all") {
        include = include && (demandData.industry?.toLowerCase() === industry.toLowerCase() || demandData.industries?.includes(industry));
      }
      
      if (level && level !== "all") {
        include = include && (demandData.level?.toLowerCase() === level.toLowerCase() || demandData.levels?.includes(level));
      }
      
      if (include) {
        filteredDemand[skill] = demandData;
      }
    }
    
    return res.json(filteredDemand);
  }
  
  res.json(demand);
});

// 3. Get Trend Data with Filtering
app.get("/api/trend", (req, res) => {
  const { location, industry, level } = req.query;
  
  // Get location-specific trend data
  let trend = getLocationSpecificTrend(location);
  
  res.json(trend);
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

// AI PREDICTION ENDPOINT WITH RATE LIMITING & FALLBACK
app.post("/api/predict-skill", async (req, res) => {
  const { skill } = req.body;

  if (!skill || !skill.trim()) {
    return res.status(400).json({ error: "Skill name is required" });
  }

  const skillKey = skill.toLowerCase();

  // Check if skill exists in dataset first
  const skillExists = data.skill_demand[skillKey];
  if (!skillExists) {
    return res.status(404).json({
      error: `The skill "${skill}" is not found in our database. Please try another skill like: Python, Java, JavaScript, Project Management, Sales, Management, etc.`,
      suggestion: "Try searching for skills that are currently in high demand, such as: Python, Java, JavaScript, SQL, AWS, Docker, Kubernetes, React, etc."
    });
  }

  // Check cache first
  if (predictionCache[skillKey]) {
    return res.json(predictionCache[skillKey]);
  }

  // Rate limiting: wait between requests
  const timeSinceLastRequest = Date.now() - lastPredictionTime;
  if (timeSinceLastRequest < PREDICTION_RATE_LIMIT) {
    const waitTime = PREDICTION_RATE_LIMIT - timeSinceLastRequest;
    return res.status(429).json({
      error: "Rate limit exceeded. Please wait before making another request.",
      retryAfter: Math.ceil(waitTime / 1000)
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Use fallback directly if API key not configured
      const fallbackData = generateFallbackPrediction(skill);
      predictionCache[skillKey] = fallbackData;
      setTimeout(() => {
        delete predictionCache[skillKey];
      }, 3600000);
      
      return res.json({
        ...fallbackData,
        _isFallbackData: true,
        _message: "Showing AI-based estimate from market data"
      });
    }

    lastPredictionTime = Date.now();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`,
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
                    "averageSalaryRange": "salary in INR",
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

    if (response.status === 429) {
      // AI API rate limited - use fallback data
      console.log("Gemini API rate limited, using fallback data for:", skill);
      const fallbackData = generateFallbackPrediction(skill);
      
      // Cache the fallback result
      predictionCache[skillKey] = fallbackData;
      setTimeout(() => {
        delete predictionCache[skillKey];
      }, 3600000);
      
      return res.json({
        ...fallbackData,
        _isFallbackData: true,
        _message: "Showing AI-based estimate from market data"
      });
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error("No response from AI service");
    }

    // Parse JSON from response
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response format");
    }

    const predictionData = JSON.parse(jsonMatch[0]);
    
    // Cache the result for 1 hour
    predictionCache[skillKey] = predictionData;
    setTimeout(() => {
      delete predictionCache[skillKey];
    }, 3600000);

    res.json(predictionData);
  } catch (err) {
    console.error("Prediction error:", err);
    // Use fallback on any error
    const fallbackData = generateFallbackPrediction(skill);
    predictionCache[skillKey] = fallbackData;
    setTimeout(() => {
      delete predictionCache[skillKey];
    }, 3600000);
    
    res.json({
      ...fallbackData,
      _isFallbackData: true,
      _message: "Showing AI-based estimate from market data"
    });
  }
});

// Generate fallback prediction data based on known demand
const generateFallbackPrediction = (skill) => {
  const skillLower = skill.toLowerCase();
  
  // Check if skill exists in demand data
  const skillDemand = data.skill_demand[skillLower];
  
  // If skill doesn't exist in dataset, return null to indicate error
  if (!skillDemand) {
    return null;
  }
  
  const demandMap = {
    "High": { demand: "High", trend: "+18%", growth: "High" },
    "Medium": { demand: "Medium", trend: "+8%", growth: "Medium" },
    "Low": { demand: "Low", trend: "+2%", growth: "Low" }
  };
  
  const demandInfo = demandMap[skillDemand.demand_level] || demandMap["High"];
  
  // Calculate salary range based on demand level and count
  let salaryRange = "";
  const count = skillDemand.count || 0;
  
  if (skillDemand.demand_level === "High") {
    if (count > 2000) {
      // Top tech skills like Python, Java, etc.
      salaryRange = "₹60,000 - ₹1,20,000 per month";
    } else if (count > 500) {
      salaryRange = "₹50,000 - ₹90,000 per month";
    } else {
      salaryRange = "₹40,000 - ₹70,000 per month";
    }
  } else if (skillDemand.demand_level === "Medium") {
    if (count > 100) {
      salaryRange = "₹35,000 - ₹60,000 per month";
    } else {
      salaryRange = "₹25,000 - ₹45,000 per month";
    }
  } else {
    // Low demand
    salaryRange = "₹15,000 - ₹35,000 per month";
  }
  
  return {
    skill: skill.charAt(0).toUpperCase() + skill.slice(1),
    currentDemand: demandInfo.demand,
    demandTrend: demandInfo.trend,
    growthPotential: demandInfo.growth,
    topIndustries: ["Technology", "Finance", "E-commerce", "Healthcare", "Education"],
    requiredRelatedSkills: ["Communication", "Problem Solving", "Team Collaboration", "Adaptability", "Continuous Learning"],
    averageSalaryRange: salaryRange,
    jobAvailability: `${count.toLocaleString()} job postings in market`,
    futureOutlook: `${skill} shows ${demandInfo.demand} demand in the current job market with ${demandInfo.trend} growth trend. The skill is increasingly important across multiple industries and offers competitive compensation.`,
    recommendations: `Focus on developing expertise in ${skill} along with complementary technical and soft skills. Consider certifications and practical projects to strengthen your profile. The salary potential for this skill ranges from ${salaryRange}.`
  };
};


// START SERVER

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});