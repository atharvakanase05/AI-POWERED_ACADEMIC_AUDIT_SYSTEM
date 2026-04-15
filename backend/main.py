

# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import mysql.connector
# import joblib

# print("🚀 Starting app...")

# app = FastAPI()

# # ================= CORS =================
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ================= LOAD MODEL =================
# try:
#     print("📦 Loading model...")
#     student_model = joblib.load("student_risk_model.pkl")

#     print("📦 Loading encoder...")
#     student_encoder = joblib.load("label_encoder.pkl")

#     print("✅ Model Loaded Successfully")

# except Exception as e:
#     print("❌ Model Error:", e)
#     student_model = None
#     student_encoder = None

# # ================= DB =================
# def get_connection():
#     print("🔥 Connecting to MySQL...")

#     return mysql.connector.connect(
#         host="127.0.0.1",
#         port=3306,
#         user="root",
#         password="atharva123",
#         database="atharva",
#         connection_timeout=5,
#         use_pure=True
#     )

# # ================= HOME =================
# @app.get("/")
# def home():
#     return {"message": "Backend Running 🚀"}

# # ================= STUDENT =================
# @app.get("/student/{roll_no}")
# def get_student(roll_no: str):
#     print("🔥 Fetch:", roll_no)

#     conn = get_connection()
#     cursor = conn.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM students_new WHERE roll_no=%s", (roll_no,))
#     student = cursor.fetchone()

#     cursor.close()
#     conn.close()

#     if not student:
#         raise HTTPException(status_code=404, detail="Student not found")

#     return student

# # ================= ANALYZE =================
# @app.post("/analyze")
# def analyze(data: dict):
#     roll_no = data.get("roll_no")

#     conn = get_connection()
#     cursor = conn.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM students_new WHERE roll_no=%s", (roll_no,))
#     student = cursor.fetchone()

#     cursor.close()
#     conn.close()

#     if not student:
#         raise HTTPException(status_code=404, detail="Student not found")

#     if student_model is None:
#         return {"error": "Model not loaded"}

#     features = [[
#         float(student["attendance"]),
#         float(student["marks"]),
#         float(student["assignment_score"]),
#         float(student["end_sem_score"]),
#         float(student["gpa"]),
#         int(student["backlogs"])
#     ]]

#     pred = student_model.predict(features)[0]
#     label = student_encoder.inverse_transform([pred])[0]
#     confidence = max(student_model.predict_proba(features)[0]) * 100

#     return {
#         "risk_level": label,
#         "confidence": round(confidence, 2)
#     }

# # ================= PLACEMENT =================
# @app.get("/placement/{roll_no}")
# def placement(roll_no: str):

#     conn = get_connection()
#     cursor = conn.cursor(dictionary=True)

#     cursor.execute("SELECT * FROM placements WHERE roll_no=%s", (roll_no,))
#     data = cursor.fetchone()

#     cursor.close()
#     conn.close()

#     return data or {}
############WORKING

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import joblib
from fastapi.responses import FileResponse
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from fastapi.responses import JSONResponse


import matplotlib
matplotlib.use('Agg')

import matplotlib.pyplot as plt
print("🚀 Starting app...")

app = FastAPI()

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= LOAD MODEL =================
try:
    print("📦 Loading model...")
    student_model = joblib.load("student_risk_model.pkl")

    print("📦 Loading encoder...")
    student_encoder = joblib.load("label_encoder.pkl")

    print("✅ Model Loaded Successfully")

except Exception as e:
    print("❌ Model Error:", e)
    student_model = None
    student_encoder = None

# ================= DB =================
def get_connection():
    return mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        password="atharva123",
        database="atharva",
        connection_timeout=5,
        use_pure=True
    )

# ================= HOME =================
@app.get("/")
def home():
    return {"message": "Backend Running 🚀"}

# ================= STUDENT =================
@app.get("/student/{roll_no}")
def get_student(roll_no: str):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM students_new WHERE roll_no=%s", (roll_no,))
    student = cursor.fetchone()

    cursor.close()
    conn.close()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return student


# ================= ANALYZE =================
@app.post("/analyze")
def analyze(data: dict):
    roll_no = data.get("roll_no")

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM students_new WHERE roll_no=%s", (roll_no,))
    student = cursor.fetchone()

    cursor.close()
    conn.close()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    if student_model is None:
        return {"error": "Model not loaded"}

    features = [[
        float(student["attendance"]),
        float(student["marks"]),
        float(student["assignment_score"]),
        float(student["end_sem_score"]),
        float(student["gpa"]),
        int(student["backlogs"])
    ]]

    pred = student_model.predict(features)[0]
    label = student_encoder.inverse_transform([pred])[0]
    confidence = max(student_model.predict_proba(features)[0]) * 100

    # ✅ PERFORMANCE SUMMARY (NEW)
    if student["marks"] > 80 and student["gpa"] > 8:
        summary = "Excellent performance. Student is academically strong and consistent."
    elif student["marks"] > 60:
        summary = "Average performance. Student is doing fine but can improve."
    else:
        summary = "Poor performance. Student needs academic improvement and support."

    return {
        "risk_level": label,
        "confidence": round(confidence, 2),
        "summary": summary
    }

# ================= PLACEMENT =================
@app.get("/placement/{roll_no}")
def placement(roll_no: str):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM placements WHERE roll_no=%s", (roll_no,))
    data = cursor.fetchone()

    cursor.close()
    conn.close()

    return data or {}

# ================= STUDENT REPORT =================
@app.get("/students/report/all")
def students_report():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM students_new")
    students = cursor.fetchall()

    cursor.close()
    conn.close()

    file = "students_report.pdf"
    doc = SimpleDocTemplate(file)
    styles = getSampleStyleSheet()

    # ================= TITLE =================
    content = [
        Paragraph("Students Performance Report (Academic Year 2025-26)", styles["Title"]),
        Spacer(1, 15)
    ]

    # ================= TABLE =================
    table = [["Roll", "Name", "Marks", "GPA", "Confidence"]]

    total_marks = 0
    total_gpa = 0
    total_confidence = 0

    for s in students:
        marks = float(s["marks"] or 0)
        gpa = float(s["gpa"] or 0)

        confidence = round(((marks / 100) * 0.7 + (gpa / 10) * 0.3) * 100, 2)

        table.append([
            s["roll_no"],
            s["name"],
            marks,
            gpa,
            f"{confidence}%"
        ])

        t = Table(table)
        t.setStyle(TableStyle([
            ("GRID", (0,0), (-1,-1), 1, colors.black),
            ("BACKGROUND", (0,0), (-1,0), colors.lightgrey)
        ]))

    content.append(t)

    # ================= SUMMARY =================
    total_marks = 0
    total_gpa = 0
    total_conf = 0
    count = 0

    for s in students:
        marks = float(s.get("marks", 0) or 0)
        gpa = float(s.get("gpa", 0) or 0)

        confidence = ((marks / 100) * 0.7 + (gpa / 10) * 0.3) * 100

        # ✅ ADDING VALUES (MOST IMPORTANT)
        total_marks += marks
        total_gpa += gpa
        total_conf += confidence
        count += 1

    # ================= AVERAGE =================

    if count == 0:
        count = 1  # safety

    avg_marks = total_marks / count
    avg_gpa = total_gpa / count
    avg_confidence = total_conf / count
        

    if avg_marks > 75:
        summary = "Overall student performance is excellent with strong academic outcomes and high placement readiness."
    elif avg_marks > 50:
        summary = "Students show moderate performance. With focused improvement, better results can be achieved."
    else:
        summary = "Student performance is below expectations and requires immediate academic improvement."
        
    content.append(Spacer(1, 20))
    content.append(Paragraph("<b>Summary</b>", styles["Heading2"]))

    content.append(Paragraph(
        f"""
        Average Marks: {round(avg_marks,2)} <br/>
        Average GPA: {round(avg_gpa,2)} <br/>
        Average Confidence: {round(avg_confidence,2)}% <br/><br/>
        {summary}
        """,
        styles["BodyText"]
    ))
        # Build PDF
    doc.build(content)

    return FileResponse(file)

# ================= PLACEMENT REPORT =================
@app.get("/placement/report/2025")
def placement_report():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT p.roll_no, p.company_name, p.package, p.status
        FROM placements p
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    # ---------------- COUNT FOR CHART ----------------
    selected = sum(1 for d in data if d["status"] == "Selected")
    not_selected = len(data) - selected

    chart = "chart.png"
    plt.figure()
    plt.bar(["Selected", "Not Selected"], [selected, not_selected])
    plt.title("Placement Overview")
    plt.savefig(chart)
    plt.close()

    # ---------------- PDF ----------------
    file = "placement_report.pdf"
    doc = SimpleDocTemplate(file)
    styles = getSampleStyleSheet()

    content = []

    # Title
    content.append(Paragraph(
        "Placement Report (Academic Year 2025-26)",
        styles["Title"]
    ))
    content.append(Spacer(1, 12))

    # ---------------- TABLE ----------------
    table_data = [["Roll No", "Company", "Package", "Status"]]

    for row in data:
        table_data.append([
            row["roll_no"],
            row.get("company_name", "N/A"),
            str(row.get("package", "N/A")),
            row["status"]
        ])

    table = Table(table_data)
    table.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
        ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
    ]))

    content.append(table)
    content.append(Spacer(1, 20))

    # ---------------- SUMMARY ----------------
    content.append(Paragraph("Summary", styles["Heading2"]))

    total = len(data)

    if total == 0:
        summary_text = "No placement data available."
    else:
        percent = (selected / total) * 100

        if percent >= 70:
            summary_text = "Excellent placement performance. Most students are successfully placed in reputed companies."
        elif percent >= 40:
            summary_text = "Moderate placement performance. Improvement in training and skill development is recommended."
        else:
            summary_text = "Low placement rate. Immediate focus on industry readiness and skill enhancement is required."

    content.append(Paragraph(
        f"""
        Total Students: {total}<br/>
        Selected: {selected}<br/>
        Not Selected: {not_selected}<br/>
        Placement Rate: {round((selected/total)*100 if total else 0, 2)}%<br/><br/>
        {summary_text}
        """,
        styles["Normal"]
    ))

    content.append(Spacer(1, 10))

    # ---------------- CHART ----------------
    content.append(Image(chart, width=400, height=250))

    doc.build(content)

    return FileResponse(file)

   # publications
# @app.get("/publications/report")
# def publications_report():
#     conn = get_connection()
#     cursor = conn.cursor(dictionary=True)

#     cursor.execute("""
#         SELECT id, roll_no, student_name, paper_title,
#                journal_name, publication_year, status
#         FROM research_publications 
#     """)

#     data = cursor.fetchall()

#     cursor.close()
#     conn.close()

#     # ---------------- STATS ----------------
#     total = len(data)
#     published = sum(1 for d in data if d["status"] == "Published")
#     in_review = total - published

#     pub_rate = (published / total) * 100 if total else 0

#     # ---------------- CHARTS ----------------

#     # PIE chart
#     pie_file = "pub_pie.png"
#     plt.figure()
#     plt.pie(
#         [published, in_review],
#         labels=["Published", "In Review"],
#         autopct="%1.1f%%"
#     )
#     plt.title("Publication Status Distribution")
#     plt.savefig(pie_file)
#     plt.close()

#     # BAR chart (year-wise publications)
#     year_count = {}
#     for d in data:
#         y = d["publication_year"]
#         year_count[y] = year_count.get(y, 0) + 1

#     bar_file = "pub_bar.png"
#     plt.figure()
#     plt.bar(list(year_count.keys()), list(year_count.values()))
#     plt.title("Year-wise Publications")
#     plt.xlabel("Year")
#     plt.ylabel("Count")
#     plt.savefig(bar_file)
#     plt.close()

#     # ---------------- PDF ----------------
#     file = "publications_report.pdf"
#     doc = SimpleDocTemplate(file)
#     styles = getSampleStyleSheet()

#     content = []

#     # TITLE
#     content.append(Paragraph(
#         "Publications Report (Academic Year 2025-26)",
#         styles["Title"]
#     ))
#     content.append(Spacer(1, 12))

#     # ---------------- TABLE ----------------
#     table_data = [[
#         "ID", "Roll No", "Student Name",
#         "Paper Title", "Journal", "Year", "Status"
#     ]]

#     for d in data:
#         table_data.append([
#             d["id"],
#             d["roll_no"],
#             d["student_name"],
#             d["paper_title"],
#             d["journal_name"],
#             d["publication_year"],
#             d["status"]
#         ])

#     table = Table(table_data)
#     table.setStyle(TableStyle([
#         ("GRID", (0, 0), (-1, -1), 1, colors.black),
#         ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),
#         ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
#     ]))

#     content.append(table)
#     content.append(Spacer(1, 15))

#     # ---------------- SUMMARY ----------------
#     content.append(Paragraph("Summary", styles["Heading2"]))

#     if total == 0:
#         summary_text = "No publication data available."
#     elif pub_rate >= 70:
#         summary_text = "Excellent research output. Students are actively publishing in reputed journals."
#     elif pub_rate >= 40:
#         summary_text = "Moderate research activity. Encouragement needed for more publications."
#     else:
#         summary_text = "Low publication rate. Strong focus required on research and paper writing."

#     content.append(Paragraph(f"""
#         Total Publications: {total}<br/>
#         Published: {published}<br/>
#         In Review: {in_review}<br/>
#         Publication Rate: {round(pub_rate, 2)}%<br/><br/>
#         {summary_text}
#     """, styles["Normal"]))

#     content.append(Spacer(1, 15))

#     # ---------------- CHARTS IN PDF ----------------
#     content.append(Paragraph("Visual Analysis", styles["Heading2"]))
#     content.append(Image(pie_file, width=250, height=200))
#     content.append(Spacer(1, 10))
#     content.append(Image(bar_file, width=400, height=250))

#     doc.build(content)

@app.get("/publications")
def get_publications():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT id, roll_no, student_name, paper_title,
               journal_name, publication_year, status
        FROM research_publications
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data