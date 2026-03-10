from pydantic import BaseModel

class StudentData(BaseModel):
    attendance: float
    internal_marks: float
    assignment_score: float
    mid_sem_score: float
    previous_gpa: float
    participation_score: float
    backlogs: float