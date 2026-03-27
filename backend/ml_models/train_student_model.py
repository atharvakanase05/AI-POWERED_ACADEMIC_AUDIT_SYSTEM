import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
df = pd.read_csv("../datasets/academic_audit_dataset.csv")

print("Dataset Shape:", df.shape)

# Check class distribution
print("\nRisk Level Distribution:")
print(df["RiskLevel"].value_counts())

# Features and Target
X = df.drop(["StudentID", "RiskLevel"], axis=1)
y = df["RiskLevel"]

# Encode labels
le = LabelEncoder()
y = le.fit_transform(y)

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Train model
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=15,
    random_state=42
)

model.fit(X_train, y_train)

# Predictions
pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, pred)
print("\nModel Accuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, pred))

# Save model
joblib.dump(model, "student_risk_model.pkl")
joblib.dump(le, "label_encoder.pkl")

print("\nModel Saved Successfully")