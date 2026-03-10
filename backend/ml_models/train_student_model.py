import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
df = pd.read_csv("datasets/student_dataset.csv")

# Features (input)
X = df[
    [
        "attendance",
        "internal_marks",
        "assignment_score",
        "mid_sem_score",
        "previous_gpa",
        "participation_score",
        "backlogs",
    ]
]

# Target (output)
y = df["final_result"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)

model.fit(X_train, y_train)

# Test accuracy
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("Model Accuracy:", accuracy)

# Save model
joblib.dump(model, "student_model.pkl")

print("Model saved successfully")