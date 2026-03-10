import pandas as pd
import numpy as np

data = []

for i in range(2000):

    attendance = np.random.randint(30, 100)
    internal_marks = np.random.randint(5, 30)
    assignment_score = np.random.randint(5, 20)
    mid_sem_score = np.random.randint(10, 50)
    previous_gpa = round(np.random.uniform(2, 9), 2)
    participation_score = np.random.randint(1, 10)
    backlogs = np.random.randint(0, 5)

    if attendance < 50 or internal_marks < 10 or backlogs >= 3:
        result = 0
    else:
        result = 1

    data.append([
        attendance,
        internal_marks,
        assignment_score,
        mid_sem_score,
        previous_gpa,
        participation_score,
        backlogs,
        result
    ])

columns = [
    "attendance",
    "internal_marks",
    "assignment_score",
    "mid_sem_score",
    "previous_gpa",
    "participation_score",
    "backlogs",
    "final_result"
]

df = pd.DataFrame(data, columns=columns)

df.to_csv("student_dataset.csv", index=False)

print("Dataset generated successfully!")