import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StudentAnalysis = () => {
  const data = [
    { semester: "Sem 1", Pass: 80, Fail: 20 },
    { semester: "Sem 2", Pass: 75, Fail: 25 },
    { semester: "Sem 3", Pass: 85, Fail: 15 },
    { semester: "Sem 4", Pass: 70, Fail: 30 },
  ];

  const [attendance, setAttendance] = useState("");
  const [internalMarks, setInternalMarks] = useState("");
  const [assignmentScore, setAssignmentScore] = useState("");
  const [studyHours, setStudyHours] = useState("");
  const [backlogs, setBacklogs] = useState("");
  const [participation, setParticipation] = useState("");
  const [semester, setSemester] = useState("");

  const [prediction, setPrediction] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [confidence, setConfidence] = useState("");

  const runAnalysis = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attendance: Number(attendance),
          internal_marks: Number(internalMarks),
          assignment_score: Number(assignmentScore),
          study_hours: Number(studyHours),
          backlogs: Number(backlogs),
          participation: Number(participation),
          semester: Number(semester),
        }),
      });

      const result = await response.json();

      setPrediction(result.prediction);
      setRiskLevel(result.risk_level);
      setConfidence((result.confidence * 100).toFixed(2));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Student Performance Analysis</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Run AI Risk Prediction</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Attendance (%)"
            className="p-2 border rounded"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          />

          <input
            type="number"
            placeholder="Internal Marks"
            className="p-2 border rounded"
            value={internalMarks}
            onChange={(e) => setInternalMarks(e.target.value)}
          />

          <input
            type="number"
            placeholder="Assignment Score"
            className="p-2 border rounded"
            value={assignmentScore}
            onChange={(e) => setAssignmentScore(e.target.value)}
          />

          <input
            type="number"
            placeholder="Study Hours"
            className="p-2 border rounded"
            value={studyHours}
            onChange={(e) => setStudyHours(e.target.value)}
          />

          <input
            type="number"
            placeholder="Backlogs"
            className="p-2 border rounded"
            value={backlogs}
            onChange={(e) => setBacklogs(e.target.value)}
          />

          <input
            type="number"
            placeholder="Participation (%)"
            className="p-2 border rounded"
            value={participation}
            onChange={(e) => setParticipation(e.target.value)}
          />

          <input
            type="number"
            placeholder="Semester"
            className="p-2 border rounded"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>

        <button
          onClick={runAnalysis}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Run AI Analysis
        </button>

        {prediction && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg">
              Prediction: <b>{prediction}</b>
            </p>

            <p className="text-lg">
              Risk Level:
              <span
                className={
                  riskLevel === "High"
                    ? "text-red-600 ml-2"
                    : "text-green-600 ml-2"
                }
              >
                {riskLevel}
              </span>
            </p>

            <p className="text-lg">Confidence: {confidence}%</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Pass Percentage Trend</h2>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semester" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Pass"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Semester Pass vs Fail
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semester" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Pass" fill="#22c55e" />
            <Bar dataKey="Fail" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentAnalysis;
