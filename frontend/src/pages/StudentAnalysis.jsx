import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuditContext } from "../AuditContext";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StudentAnalysis = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [result, setResult] = useState(null); // ✅ ADD THIS

  const { setStudentData } = useContext(AuditContext);
  const department = "Computer Engineering";
  const [attendance, setAttendance] = useState("");
  const [internalMarks, setInternalMarks] = useState("");
  const [assignmentScore, setAssignmentScore] = useState("");
  const [studyHours, setStudyHours] = useState("");
  const [backlogs, setBacklogs] = useState("");
  const [participation, setParticipation] = useState("");
  const [semester, setSemester] = useState("");
  const [midtermMarks, setMidtermMarks] = useState("");
  const [finalExamMarks, setFinalExamMarks] = useState("");
  const [gpa, setGpa] = useState("");

  const [riskLevel, setRiskLevel] = useState("");
  const [confidence, setConfidence] = useState("");
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState(null);

  const runAnalysis = async () => {
    setError("");

    const payload = {
      department,
      semester: Number(semester),
      attendance: Number(attendance),
      internal_marks: Number(internalMarks),
      assignment_score: Number(assignmentScore),
      study_hours: Number(studyHours),
      backlogs: Number(backlogs),
      participation: Number(participation),
      midterm_marks: Number(midtermMarks),
      final_exam_marks: Number(finalExamMarks),
      gpa: Number(gpa),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("API failed");

      const result = await response.json();

      const risk = result.risk_level;
      setRiskLevel(risk);
      setConfidence((result.confidence * 100).toFixed(2));
      setResult(result);

      setStudentData({
        riskLevel: result.risk_level,
        confidence: result.confidence,
        gpa,
        attendance,
      });
      // ✅ REAL DATA BASED CHARTS
      const barData = [
        { name: "Internal", value: Number(internalMarks) },
        { name: "Assignment", value: Number(assignmentScore) },
        { name: "Midterm", value: Number(midtermMarks) },
        { name: "Final", value: Number(finalExamMarks) },
      ];

      const pieData = [
        { name: "Achieved", value: Number(gpa) * 10 },
        { name: "Remaining", value: 100 - Number(gpa) * 10 },
      ];

      const lineData = [
        {
          name: "Performance",
          score:
            (Number(internalMarks) +
              Number(assignmentScore) +
              Number(midtermMarks) +
              Number(finalExamMarks)) /
            2,
        },
      ];

      setChartData({ barData, pieData, lineData });
    } catch (err) {
      console.error(err);
      setError("Backend connection failed. Make sure FastAPI is running.");
    }
  };

  const riskColor =
    riskLevel === "High Risk"
      ? "text-red-600"
      : riskLevel === "Moderate Risk"
        ? "text-yellow-500"
        : "text-green-600";

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          AI Academic Audit System - Student Analysis
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>

      <h2 className="text-lg text-gray-600 mb-6">Department: {department}</h2>

      {/* INPUT SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Run AI Analysis</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Semester (1-8)"
            min="1"
            max="8"
            className="p-2 border rounded"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />

          <input
            type="number"
            placeholder="Attendance (%) (0 - 100)"
            min="0"
            max="100"
            className="p-2 border rounded"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          />

          <input
            type="number"
            placeholder="Internal Marks (0 - 30)"
            min="0"
            max="30"
            className="p-2 border rounded"
            value={internalMarks}
            onChange={(e) => setInternalMarks(e.target.value)}
          />

          <input
            type="number"
            placeholder="Assignment Score (0 - 20)"
            min="0"
            max="20"
            className="p-2 border rounded"
            value={assignmentScore}
            onChange={(e) => setAssignmentScore(e.target.value)}
          />

          <input
            type="number"
            placeholder="Study Hours (0 - 12)"
            min="0"
            max="12"
            className="p-2 border rounded"
            value={studyHours}
            onChange={(e) => setStudyHours(e.target.value)}
          />

          <input
            type="number"
            placeholder="Backlogs (0 - 10)"
            min="0"
            max="10"
            className="p-2 border rounded"
            value={backlogs}
            onChange={(e) => setBacklogs(e.target.value)}
          />

          <input
            type="number"
            placeholder="Final Exam Marks (0 - 100)"
            min="0"
            max="100"
            className="p-2 border rounded"
            value={finalExamMarks}
            onChange={(e) => setFinalExamMarks(e.target.value)}
          />

          <input
            type="number"
            placeholder="GPA (0 - 10)"
            min="0"
            max="10"
            step="0.1"
            className="p-2 border rounded"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
          />
        </div>

        <button
          onClick={runAnalysis}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Run AI Analysis
        </button>

        <button
          onClick={() => navigate("/report")}
          className="mt-4 ml-4 bg-green-600 text-white px-6 py-2 rounded"
        >
          View Audit Report
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {/* ✅ PROFESSIONAL OUTPUT */}
        {riskLevel && (
          <div className="mt-6 p-5 bg-gray-50 rounded-xl shadow">
            <h2 className="text-xl font-bold">🎯 AI Risk Assessment</h2>

            <p className={`text-2xl font-bold ${riskColor}`}>{riskLevel}</p>

            <p className="mt-2">
              Confidence: <b>{confidence}%</b>
            </p>

            <p className="mt-3 text-gray-700">
              {riskLevel === "High Risk" &&
                "⚠️ High chance of failure. Immediate action required."}
              {riskLevel === "Moderate Risk" &&
                "⚠️ Average performance. Improvement needed."}
              {riskLevel === "Low Risk" && "✅ Good performance. Keep it up!"}
            </p>
          </div>
        )}
      </div>

      {/* ✅ CHARTS */}
      {chartData && (
        <div className="grid grid-cols-2 gap-6">
          {/* PIE */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Performance Split</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={chartData.pieData} dataKey="value">
                  {chartData.pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* BAR */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Marks Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* LINE */}
          <div className="bg-white p-6 rounded-xl shadow col-span-2">
            <h2 className="font-semibold mb-4">Overall Score</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="score" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAnalysis;
