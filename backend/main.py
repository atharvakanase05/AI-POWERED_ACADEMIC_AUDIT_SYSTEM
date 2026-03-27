from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model and encoder
model = joblib.load("ml_models/student_risk_model.pkl")
label_encoder = joblib.load("ml_models/label_encoder.pkl")


# Request body schema
class StudentData(BaseModel):
    semester: int
    attendance: int
    internal_marks: int
    assignment_score: int
    study_hours: int
    backlogs: int
    participation: int
    midterm_marks: int
    final_exam_marks: int
    gpa: float


@app.get("/")
def home():
    return {"message": "AI Academic Audit System API running"}


@app.post("/analyze")
def analyze(student: StudentData):

    # Convert input into list
    features = [[
        student.semester,
        student.attendance,
        student.internal_marks,
        student.assignment_score,
        student.study_hours,
        student.backlogs,
        student.participation,
        student.midterm_marks,
        student.final_exam_marks,
        student.gpa
    ]]

    # AI Prediction
    prediction = model.predict(features)[0]

    # Probability
    confidence = model.predict_proba(features)[0].max()

    # Convert prediction to text
    if prediction == 1:
        result = "Pass"
    else:
        result = "Fail"

    # Risk Level Logic
    if student.gpa < 5 or student.backlogs >= 3:
        risk = "High Risk"
    elif student.gpa < 7 or student.attendance < 60:
        risk = "Moderate Risk"
    else:
        risk = "Low Risk"

    return {
        "prediction": result,
        "risk_level": risk,
        "confidence": float(confidence)
    }
