import pandas as pd
import numpy as np

np.random.seed(42)

num_students = 800

# Generate realistic academic data
data = pd.DataFrame({
    "attendance": np.random.randint(30, 101, num_students),
    "internal_marks": np.random.randint(0, 31, num_students),
    "assignment_score": np.random.randint(0, 21, num_students),
    "mid_sem_score": np.random.randint(0, 51, num_students),
    "previous_gpa": np.round(np.random.uniform(4.0, 10.0, num_students), 2),
    "participation_score": np.random.randint(0, 11, num_students),
    "backlogs": np.random.randint(0, 6, num_students)
})

# Improved weighted score (more realistic scaling)
score = (
    0.3 * data["attendance"] +
    1.5 * data["internal_marks"] +
    1.2 * data["assignment_score"] +
    1.5 * data["mid_sem_score"] +
    10 * data["previous_gpa"] -
    8 * data["backlogs"]
)

# Dynamic threshold using median (auto-balanced)
threshold = score.median()

data["final_result"] = (score > threshold).astype(int)

# Save dataset
data.to_csv("student_dataset.csv", index=False)

print("Dataset generated successfully!")
print("\nPass/Fail Distribution:")
print(data["final_result"].value_counts())