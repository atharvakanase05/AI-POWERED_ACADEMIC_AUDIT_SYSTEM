from fastapi import APIRouter

router = APIRouter()

@router.get("/student-risk-summary")
def get_student_risk_summary():
    return {
        "high_risk_students": 12,
        "medium_risk_students": 25,
        "low_risk_students": 63
    }