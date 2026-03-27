import pandas as pd
import numpy as np

np.random.seed(42)

num_students = 3000

data = []

for i in range(num_students):

    attendance = np.random.randint(40, 100)
    internal = np.random.randint(0, 30)
    assignment = np.random.randint(0, 20)
    study_hours = np.random.randint(1, 30)
    backlogs = np.random.randint(0, 5)
    participation = np.random.randint(0, 100)
    midterm = np.random.randint(0, 50)
    final = np.random.randint(0, 100)

    gpa = (internal + assignment + midterm + final) / 20

    score = (
        attendance * 0.2 +
        internal * 0.15 +
        assignment * 0.1 +
        midterm * 0.2 +
        final * 0.25 +
        study_hours * 0.05 +
        participation * 0.05 -
        backlogs * 5
    )

    if score < 40:
        risk = "High Risk"
    elif score < 70:
        risk = "Moderate Risk"
    else:
        risk = "Low Risk"

    data.append([
        i+1,
        np.random.randint(1,8),
        attendance,
        internal,
        assignment,
        study_hours,
        backlogs,
        participation,
        midterm,
        final,
        round(gpa,2),
        risk
    ])

columns = [
"StudentID",
"Semester",
"Attendance",
"InternalMarks",
"AssignmentScore",
"StudyHours",
"Backlogs",
"Participation",
"MidtermMarks",
"FinalExamMarks",
"GPA",
"RiskLevel"
]

df = pd.DataFrame(data, columns=columns)

df.to_csv("academic_audit_dataset.csv", index=False)

print("Dataset Generated Successfully")