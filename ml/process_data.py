import pandas as pd
import json
from collections import Counter

# =========================
# 1. LOAD DATASET
# =========================
df = pd.read_csv("job_dataset.csv")

print("Dataset Loaded ✅")

# =========================
# 2. CLEAN DATA
# =========================
df = df.dropna()
df = df.drop_duplicates()

# Normalize category
df['Category'] = df['Category'].astype(str).str.lower()

print("Data Cleaned ✅")

# =========================
# 3. ADD SKILLS COLUMN (FEATURE ENGINEERING 🔥)
# =========================

skill_map = {
    "data scientist": ["python", "machine learning", "pandas", "numpy", "statistics"],
    "data analyst": ["excel", "sql", "power bi", "python"],
    "software engineer": ["java", "c++", "data structures", "algorithms"],
    "web developer": ["html", "css", "javascript", "react"],
    "cloud engineer": ["aws", "docker", "kubernetes"],
    "ai engineer": ["python", "tensorflow", "deep learning"],
    "business analyst": ["excel", "sql", "communication"],
}

def assign_skills(category):
    for key in skill_map:
        if key in category:
            return ", ".join(skill_map[key])
    return "general skills"

df['Skills'] = df['Category'].apply(assign_skills)

print("Skills column added ✅")

# =========================
# 4. SKILL EXTRACTION
# =========================

skills_list = []

for skills in df['Skills']:
    for skill in skills.split(','):
        skills_list.append(skill.strip().lower())

print("Skills extracted ✅")

# =========================
# 5. SKILL FREQUENCY (TRENDING SKILLS)
# =========================

skill_count = Counter(skills_list)

top_skills = skill_count.most_common(10)

print("Top Skills:", top_skills)

# =========================
# 6. DEMAND LEVEL CLASSIFICATION
# =========================

skill_demand = {}

for skill, count in skill_count.items():
    if count > 50:
        level = "High"
    elif count > 20:
        level = "Medium"
    else:
        level = "Low"

    skill_demand[skill] = {
        "count": count,
        "demand_level": level
    }

print("Demand levels calculated ✅")

# =========================
# 7. OPTIONAL: TIME TREND (if Date exists)
# =========================

if 'Date' in df.columns:
    df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
    trend = df.groupby(df['Date'].dt.to_period('M')).size()
    trend = {str(k): int(v) for k, v in trend.items()}
else:
    trend = {}

# =========================
# 8. SAVE OUTPUT (FOR FRONTEND 🔥)
# =========================

output = {
    "top_skills": top_skills,
    "skill_demand": skill_demand,
    "trend": trend
}

with open("output.json", "w") as f:
    json.dump(output, f, indent=4)

print("Output JSON created ✅")