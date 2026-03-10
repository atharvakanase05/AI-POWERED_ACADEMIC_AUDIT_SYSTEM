import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {
  // ✅ KPI States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [totalStudents, setTotalStudents] = useState(1248);
  const [passPercentage, setPassPercentage] = useState(87);
  const [riskStudents, setRiskStudents] = useState(142);
  const [facultyScore, setFacultyScore] = useState(8.4);

  // ✅ Chart States (THIS WAS MISSING)
  const [performanceData, setPerformanceData] = useState([
    { grade: "A", students: 220 },
    { grade: "B", students: 410 },
    { grade: "C", students: 350 },
    { grade: "D", students: 180 },
    { grade: "F", students: 88 },
  ]);

  const [riskData, setRiskData] = useState([
    { name: "Low Risk", value: 890 },
    { name: "Moderate Risk", value: 220 },
    { name: "High Risk", value: 138 },
  ]);

  // ✅ Run Analysis Function
  const runAnalysis = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      // Update KPIs
      setTotalStudents(1265);
      setPassPercentage(90);
      setRiskStudents(120);
      setFacultyScore(8.9);

      // Update Bar Chart
      setPerformanceData([
        { grade: "A", students: 260 },
        { grade: "B", students: 430 },
        { grade: "C", students: 300 },
        { grade: "D", students: 150 },
        { grade: "F", students: 60 },
      ]);

      // Update Pie Chart
      setRiskData([
        { name: "Low Risk", value: 920 },
        { name: "Moderate Risk", value: 210 },
        { name: "High Risk", value: 135 },
      ]);

      setIsAnalyzing(false);
    }, 2000);
  };

  const COLORS = ["#22C55E", "#FACC15", "#EF4444"];

  const riskPercentage = ((riskStudents / totalStudents) * 100).toFixed(1);
  let riskLevel = "Low";
  let riskColor = "bg-green-100 text-green-700";

  if (riskPercentage > 15) {
    riskLevel = "High";
    riskColor = "bg-red-100 text-red-700";
  } else if (riskPercentage > 8) {
    riskLevel = "Moderate";
    riskColor = "bg-yellow-100 text-yellow-700";
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
          {/* KPI Section */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h3 className="text-sm text-gray-500">Total Students</h3>
              <p className="text-2xl font-bold text-blue-700 mt-2">
                {totalStudents}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h3 className="text-sm text-gray-500">Pass Percentage</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {passPercentage}%
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h3 className="text-sm text-gray-500">At-Risk Students</h3>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {riskStudents}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h3 className="text-sm text-gray-500">
                Faculty Performance Score
              </h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {facultyScore} / 10
              </p>
            </div>
          </div>
          {/* Run AI Button */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Run AI Analysis"}
            </button>
          </div>
          {/* AI Insight Section */}{" "}
          <div className="bg-white p-6 rounded-2xl shadow-md border mb-10">
            {" "}
            <h2 className="text-lg font-semibold mb-3 text-blue-900">
              {" "}
              🤖 AI Generated Academic Insight{" "}
            </h2>{" "}
            <p className="text-gray-700 leading-relaxed">
              {" "}
              The AI model analyzed attendance records, internal marks, and
              assignment performance across departments. Approximately{" "}
              <span className="font-semibold text-red-600">
                {" "}
                {riskPercentage}% of students{" "}
              </span>{" "}
              are classified as academically at-risk due to consistently low
              attendance and below-average internal assessment scores.{" "}
            </p>{" "}
            <p className="text-gray-700 mt-3 leading-relaxed">
              {" "}
              Faculty performance indicators show a{" "}
              <span className="font-semibold text-green-600">
                {" "}
                2% improvement{" "}
              </span>{" "}
              compared to the previous semester.{" "}
            </p>{" "}
            <div className="mt-5 flex items-center gap-3">
              {" "}
              <span
                className={`${riskColor} px-3 py-1 rounded-full text-sm font-medium`}
              >
                Risk Level: {riskLevel}
              </span>{" "}
              <span className="text-sm text-gray-500">
                {" "}
                Recommendation: Increase mentoring sessions for identified
                students.{" "}
              </span>{" "}
            </div>{" "}
          </div>
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md border mb-10">
            <h2 className="text-lg font-semibold mb-5 text-blue-900">
              📊 Student Performance Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#1E3A8A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md border mb-10">
            <h2 className="text-lg font-semibold mb-5 text-blue-900">
              🎯 Academic Risk Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Navigation Cards */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            <Link to="/student">
              <Card title="Student Analysis" />
            </Link>

            <Link to="/faculty">
              <Card title="Faculty Analysis" />
            </Link>

            <Link to="/institution">
              <Card title="Institutional Overview" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
