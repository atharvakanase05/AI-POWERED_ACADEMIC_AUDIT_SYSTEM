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

const FacultyAnalysis = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { setFacultyData } = useContext(AuditContext);
  const department = "Computer Engineering";
  const [subject, setSubject] = useState("");
  const [totalStudents, setTotalStudents] = useState("");
  const [avgMarks, setAvgMarks] = useState("");
  const [passPercentage, setPassPercentage] = useState("");
  const [avgAttendance, setAvgAttendance] = useState("");
  const [assignmentsAvg, setAssignmentsAvg] = useState("");

  const [result, setResult] = useState(null);

  // 🔥 Faculty Score Calculation
  const calculateAnalysis = () => {
    const teachingScore =
      avgMarks * 0.4 +
      passPercentage * 0.3 +
      avgAttendance * 0.2 +
      assignmentsAvg * 0.1;

    const riskData = [
      { name: "Low Risk", value: passPercentage },
      { name: "High Risk", value: 100 - passPercentage },
    ];

    const trendData = [
      { name: "Attendance", value: avgAttendance },
      { name: "Marks", value: avgMarks },
      { name: "Assignments", value: assignmentsAvg },
    ];

    let rating = "";
    if (teachingScore > 75) rating = "Excellent";
    else if (teachingScore > 60) rating = "Good";
    else rating = "Needs Improvement";

    setFacultyData({
      teachingScore,
      rating,
      passPercentage,
    });

    setResult({
      teachingScore: teachingScore.toFixed(2),
      rating,
      riskData,
      trendData,
    });
  };

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          AI Academic Audit System - Faculty Analysis
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
        <h2 className="text-xl font-semibold mb-4">Enter Class Data</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Semester (1 - 8)"
            min="1"
            max="8"
            className="p-2 border rounded"
          />

          <input
            placeholder="Subject Name"
            className="p-2 border rounded"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            type="number"
            placeholder="Total Students (1 - 300)"
            min="1"
            max="300"
            className="p-2 border rounded"
            value={totalStudents}
            onChange={(e) => setTotalStudents(e.target.value)}
          />

          <input
            type="number"
            placeholder="Average Marks (0 - 100)"
            min="0"
            max="100"
            className="p-2 border rounded"
            value={avgMarks}
            onChange={(e) => setAvgMarks(e.target.value)}
          />

          <input
            type="number"
            placeholder="Pass Percentage (%) (0 - 100)"
            min="0"
            max="100"
            className="p-2 border rounded"
            value={passPercentage}
            onChange={(e) => setPassPercentage(e.target.value)}
          />

          <input
            type="number"
            placeholder="Average Attendance (%) (0 - 100)"
            min="0"
            max="100"
            className="p-2 border rounded"
            value={avgAttendance}
            onChange={(e) => setAvgAttendance(e.target.value)}
          />

          <input
            type="number"
            placeholder="Assignment Average (%) (0 - 100)"
            min="0"
            max="100"
            className="p-2 border rounded"
            value={assignmentsAvg}
            onChange={(e) => setAssignmentsAvg(e.target.value)}
          />
        </div>

        <button
          onClick={calculateAnalysis}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Run Faculty Audit
        </button>

        <button
          onClick={() => navigate("/report")}
          className="mt-4 ml-4 bg-green-600 text-white px-6 py-2 rounded"
        >
          View Audit Report
        </button>
      </div>

      {/* RESULT SECTION */}
      {result && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Faculty Performance Result
          </h2>

          <p className="text-lg">
            Teaching Score: <b>{result.teachingScore}</b>
          </p>

          <p className="text-lg">
            Rating: <b>{result.rating}</b>
          </p>
        </div>
      )}

      {/* CHARTS */}
      {result && (
        <div className="grid grid-cols-2 gap-6">
          {/* PIE CHART */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Student Risk Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={result.riskData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {result.riskData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* BAR CHART */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={result.trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyAnalysis;
