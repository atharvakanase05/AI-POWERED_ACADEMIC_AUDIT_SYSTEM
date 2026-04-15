# import pandas as pd
# import joblib

# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.preprocessing import LabelEncoder
# from sklearn.metrics import accuracy_score, classification_report

# # Load dataset
# df = pd.read_csv("../datasets/academic_audit_dataset.csv")

# print("Dataset Shape:", df.shape)

# # Check class distribution
# print("\nRisk Level Distribution:")
# print(df["RiskLevel"].value_counts())

# # Features and Target
# X = df.drop(["StudentID", "RiskLevel"], axis=1)
# y = df["RiskLevel"]

# # Encode labels
# le = LabelEncoder()
# y = le.fit_transform(y)

# # Train test split
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y,
#     test_size=0.2,
#     random_state=42,
#     stratify=y
# )

# # Train model
# model = RandomForestClassifier(
#     n_estimators=300,
#     max_depth=15,
#     random_state=42
# )

# model.fit(X_train, y_train)

# # Predictions
# pred = model.predict(X_test)

# # Accuracy
# accuracy = accuracy_score(y_test, pred)
# print("\nModel Accuracy:", accuracy)

# print("\nClassification Report:")
# print(classification_report(y_test, pred))

# # Save model
# joblib.dump(model, "student_risk_model.pkl")
# joblib.dump(le, "label_encoder.pkl")

# print("\nModel Saved Successfully")

###########working
#import pandas as pd
# import joblib

# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.preprocessing import LabelEncoder
# from sklearn.metrics import accuracy_score, classification_report

# # Load dataset
# df = pd.read_csv("../datasets/academic_audit_dataset.csv")

# print("Dataset Shape:", df.shape)

# print("\nRisk Distribution:")
# print(df["RiskLevel"].value_counts())

# # Features / Target
# X = df.drop(["StudentID", "RiskLevel"], axis=1)
# y = df["RiskLevel"]

# # Encode target
# le = LabelEncoder()
# y_encoded = le.fit_transform(y)

# # Split
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y_encoded,
#     test_size=0.2,
#     random_state=42,
#     stratify=y_encoded
# )

# # Model
# model = RandomForestClassifier(
#     n_estimators=300,
#     max_depth=15,
#     random_state=42
# )

# model.fit(X_train, y_train)

# # Evaluate
# pred = model.predict(X_test)

# print("\nAccuracy:", accuracy_score(y_test, pred))
# print("\nReport:\n", classification_report(y_test, pred))

# # SAVE MODELS (IMPORTANT FIXED PATH)
# joblib.dump(model, "student_risk_model.pkl")
# joblib.dump(le, "label_encoder.pkl")

# print("\n✅ Model + Encoder Saved Successfully")

import pandas as pd
import joblib
import mysql.connector

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

# ================= DB =================
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="atharva123",
    database="atharva"
)

query = """
SELECT 
    attendance,
    marks,
    assignment_score,
    end_sem_score,
    gpa,
    backlogs
FROM students_new
"""

df = pd.read_sql(query, conn)

# ================= RISK LOGIC =================
def assign_risk(row):
    score = (
        row["attendance"] * 0.2 +
        row["marks"] * 0.3 +
        row["assignment_score"] * 0.1 +
        row["end_sem_score"] * 0.3 +
        row["gpa"] * 2
    )

    if row["backlogs"] > 2 or score < 50:
        return "High Risk"
    elif score < 70:
        return "Moderate Risk"
    else:
        return "Low Risk"

df["RiskLevel"] = df.apply(assign_risk, axis=1)

# ================= TRAIN =================
X = df.drop(["RiskLevel"], axis=1)
y = df["RiskLevel"]

le = LabelEncoder()
y = le.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier(n_estimators=200, max_depth=10)
model.fit(X_train, y_train)

pred = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, pred))
print(classification_report(y_test, pred))

joblib.dump(model, "student_risk_model.pkl")
joblib.dump(le, "label_encoder.pkl")

print("✅ Model Ready")