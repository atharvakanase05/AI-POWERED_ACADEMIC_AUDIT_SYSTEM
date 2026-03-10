import joblib
import numpy as np

# ✅ Load model ONCE when file loads
model = joblib.load("ml_models/student_model.pkl")

def predict_student(data):

    features = np.array([[
        data.attendance,
        data.internal_marks,
        data.assignment_score,
        data.mid_sem_score,
        data.previous_gpa,
        data.participation_score,
        data.backlogs
    ]])

    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]

    result_label = "Pass" if prediction == 1 else "Fail"

    return {
        "prediction": result_label,
        "probability_of_passing": round(float(probability), 4)
    }