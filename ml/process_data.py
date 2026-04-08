import pandas as pd
import json
from collections import Counter
import os

# =========================
# 1. LOAD DATASET
# =========================
# Check for Excel or CSV file
if os.path.exists("job_dataset.xlsx"):
    df = pd.read_excel("job_dataset.xlsx")
elif os.path.exists("job_dataset.csv"):
    df = pd.read_csv("job_dataset.csv")
else:
    raise FileNotFoundError("Dataset file not found (job_dataset.xlsx or job_dataset.csv)")

print("Dataset Loaded ✅")
print(f"Dataset shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")

# =========================
# 2. CLEAN DATA
# =========================
df = df.dropna(subset=['tagsAndSkills', 'title'])
df = df[df['tagsAndSkills'].str.len() > 0]

# Normalize title
df['title'] = df['title'].astype(str).str.lower()

print("Data Cleaned ✅")

# =========================
# 3. SKILL EXTRACTION (Direct from tagsAndSkills column)
# =========================

skills_list = []

# Extract skills directly from tagsAndSkills column
for skills_str in df['tagsAndSkills']:
    if pd.notna(skills_str):
        # Split by comma and clean
        for skill in str(skills_str).split(','):
            skill_clean = skill.strip().lower()
            if skill_clean:
                skills_list.append(skill_clean)

print("Skills extracted ✅")
print(f"Total skills found: {len(skills_list)}")

# =========================
# 4. SKILL FREQUENCY (TRENDING SKILLS)
# =========================

skill_count = Counter(skills_list)

top_skills = skill_count.most_common(10)

# Create a list with demand information for top skills
top_skills_with_demand = []
for skill, count in top_skills:
    top_skills_with_demand.append({
        "name": skill,
        "count": count,
        "demand_level": "High" if count > 50 else "Medium" if count > 20 else "Low"
    })

print("Top Skills:", [(s["name"], s["count"]) for s in top_skills_with_demand])

# =========================
# 5. DEMAND LEVEL CLASSIFICATION
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
# 6. OPTIONAL: TIME TREND (if Date exists)
# =========================

# Try to find date column (common column names)
date_columns = [col for col in df.columns if 'date' in col.lower() or 'month' in col.lower()]

if date_columns:
    date_col = date_columns[0]
    df[date_col] = pd.to_datetime(df[date_col], errors='coerce')
    trend_data = df.groupby(df[date_col].dt.to_period('M')).size()
    trend = {str(k): int(v) for k, v in trend_data.items()}
    print(f"Trend analysis created from '{date_col}' ✅")
else:
    # Create categorical trend data from skill categories
    # Categorize skills into groups and show demand trends
    categories = {
        "AI/ML": ["python", "machine learning", "tensorflow", "deep learning", "ai", "artificial intelligence", "neural"],
        "Cloud": ["aws", "azure", "cloud", "kubernetes", "docker", "gcp"],
        "Security": ["cybersecurity", "security", "penetration", "ssl", "encryption"],
        "Data": ["sql", "data analytics", "data science", "hadoop", "spark", "tableau", "power bi"]
    }
    
    trend = {}
    
    # Calculate demand for each category
    for category, keywords in categories.items():
        count = 0
        for skill in skill_demand:
            for keyword in keywords:
                if keyword.lower() in skill.lower():
                    count += skill_demand[skill]["count"]
                    break
        trend[category] = count
    
    print("Categorical trend data created ✅")

# =========================
# 7. SAVE OUTPUT (FOR FRONTEND 🔥)
# =========================

output = {
    "top_skills": top_skills_with_demand,
    "skill_demand": skill_demand,
    "trend": trend
}

with open("output.json", "w") as f:
    json.dump(output, f, indent=4)

print("Output JSON created ✅")