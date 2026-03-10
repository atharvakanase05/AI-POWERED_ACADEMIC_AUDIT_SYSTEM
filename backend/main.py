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

# Load ML model
model = joblib.load("student_model.pkl")


# Request body schema
class StudentData(BaseModel):
    attendance: int
    internal_marks: int
    assignment_score: int
    study_hours: int
    backlogs: int
    participation: int
    semester: int


@app.get("/")
def home():
    return {"message": "AI Academic Audit System API running"}


@app.post("/analyze")
def analyze(data: StudentData):

    input_data = [[
        data.attendance,
        data.internal_marks,
        data.assignment_score,
        data.study_hours,
        data.backlogs,
        data.participation,
        data.semester
    ]]

    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0]

    risk_level = "High" if prediction == 1 else "Low"
    result = "Fail" if prediction == 1 else "Pass"

    confidence = max(probability)

    return {
        "prediction": result,
        "risk_level": risk_level,
        "confidence": confidence
    }