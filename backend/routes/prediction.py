from fastapi import APIRouter
from models.student import StudentData
from services.predict_service import predict_student

router = APIRouter()

@router.post("/predict-student")
def predict(data: StudentData):
    return predict_student(data)