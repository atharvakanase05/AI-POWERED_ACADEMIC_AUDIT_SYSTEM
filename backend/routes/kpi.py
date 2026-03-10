from fastapi import APIRouter

router = APIRouter()

@router.get("/student-kpi")
def get_student_kpi():
    return {
        "average_attendance": 82,
        "average_internal_marks": 74,
        "average_gpa": 7.8,
        "pass_rate_percentage": 86
    }