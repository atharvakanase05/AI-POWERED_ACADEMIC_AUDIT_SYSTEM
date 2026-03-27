import pandas as pd
import numpy as np

np.random.seed(42)

students_per_category = 1000

data = []

# LOW RISK STUDENTS
for i in range(students_per_category):

    data.append([
        i+1,
        np.random.randint(1,8),
        np.random.randint(80,100),
        np.random.randint(22,30),
        np.random.randint(15,20),
        np.random.randint(15,25),
        np.random.randint(0,1),
        np.random.randint(60,100),
        np.random.randint(35,50),
        np.random.randint(70,100),
        round(np.random.uniform(7.5,9.5),2),
        "Low Risk"
    ])

# MODERATE RISK STUDENTS
for i in range(students_per_category):

    data.append([
        1000+i+1,
        np.random.randint(1,8),
        np.random.randint(60,80),
        np.random.randint(15,22),
        np.random.randint(10,15),
        np.random.randint(8,15),
        np.random.randint(0,2),
        np.random.randint(40,60),
        np.random.randint(25,35),
        np.random.randint(50,70),
        round(np.random.uniform(6,7.5),2),
        "Moderate Risk"
    ])

# HIGH RISK STUDENTS
for i in range(students_per_category):

    data.append([
        2000+i+1,
        np.random.randint(1,8),
        np.random.randint(30,60),
        np.random.randint(5,15),
        np.random.randint(5,10),
        np.random.randint(1,8),
        np.random.randint(2,5),
        np.random.randint(10,40),
        np.random.randint(10,25),
        np.random.randint(20,50),
        round(np.random.uniform(3,6),2),
        "High Risk"
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
print(df["RiskLevel"].value_counts())