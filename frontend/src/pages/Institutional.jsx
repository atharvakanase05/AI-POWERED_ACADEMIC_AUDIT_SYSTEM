import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuditContext } from "../AuditContext";

function InstitutionalOverview() {
  const { setInstitutionData } = useContext(AuditContext);
  const navigate = useNavigate();

  const department = "Computer Engineering";

  // ✅ MULTIPLE SEM DATA
  const semesterData = [
    {
      sem: 1,
      totalStudents: 100,
      passPercentage: 70,
      avgGPA: 6.8,
      avgAttendance: 75,
      backlogs: 2,
      assignmentScore: 60,
    },
    {
      sem: 2,
      totalStudents: 90,
      passPercentage: 65,
      avgGPA: 6.5,
      avgAttendance: 72,
      backlogs: 3,
      assignmentScore: 55,
    },
    {
      sem: 3,
      totalStudents: 80,
      passPercentage: 68,
      avgGPA: 6.7,
      avgAttendance: 74,
      backlogs: 2,
      assignmentScore: 58,
    },
    {
      sem: 4,
      totalStudents: 60,
      passPercentage: 72,
      avgGPA: 7.0,
      avgAttendance: 78,
      backlogs: 1,
      assignmentScore: 62,
    },
    {
      sem: 5,
      totalStudents: 70,
      passPercentage: 60,
      avgGPA: 6.2,
      avgAttendance: 70,
      backlogs: 4,
      assignmentScore: 50,
    },
    {
      sem: 6,
      totalStudents: 65,
      passPercentage: 66,
      avgGPA: 6.6,
      avgAttendance: 73,
      backlogs: 3,
      assignmentScore: 57,
    },
    {
      sem: 7,
      totalStudents: 90,
      passPercentage: 75,
      avgGPA: 7.2,
      avgAttendance: 80,
      backlogs: 1,
      assignmentScore: 65,
    },
    {
      sem: 8,
      totalStudents: 87,
      passPercentage: 78,
      avgGPA: 7.5,
      avgAttendance: 82,
      backlogs: 0,
      assignmentScore: 70,
    },
  ];

  // ✅ SEND FULL DATA TO CONTEXT
  useEffect(() => {
    setInstitutionData(semesterData);
  }, []);

  // ✅ INSIGHTS FUNCTION
  const getInsights = (data) => {
    let insights = [];

    if (data.avgAttendance < 75)
      insights.push("⚠️ Low attendance may reduce performance");

    if (data.passPercentage < 60)
      insights.push("❌ Pass percentage is below academic standard");

    if (data.avgGPA < 6)
      insights.push("📉 Overall GPA is low — needs improvement");

    if (data.backlogs > 2) insights.push("🚨 High backlog count detected");

    if (insights.length === 0) insights.push("✅ Institution performing well");

    return insights;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ✅ Back Button + Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Institutional Academic Overview - Computer Department
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
      {/* 🔥 LOOP ALL SEMS */}
      {semesterData.map((data, index) => {
        const constraints = [
          { label: "Attendance ≥ 75%", value: data.avgAttendance >= 75 },
          { label: "Pass % ≥ 60%", value: data.passPercentage >= 60 },
          { label: "Avg GPA ≥ 6", value: data.avgGPA >= 6 },
          { label: "Backlogs ≤ 2", value: data.backlogs <= 2 },
          { label: "Assignment ≥ 50%", value: data.assignmentScore >= 50 },
        ];

        return (
          <div key={index} className="mb-10">
            <h1 className="text-3xl font-bold mb-2"> Sem {data.sem}</h1>

            <h2 className="text-lg text-gray-600 mb-6">
              Department: {department}
            </h2>

            {/* KPI CARDS */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded shadow">
                <h2>Total Students</h2>
                <p className="text-xl font-bold">{data.totalStudents}</p>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h2>Pass %</h2>
                <p className="text-xl font-bold">{data.passPercentage}%</p>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h2>Avg GPA</h2>
                <p className="text-xl font-bold">{data.avgGPA}</p>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h2>Attendance</h2>
                <p className="text-xl font-bold">{data.avgAttendance}%</p>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h2>Backlogs</h2>
                <p className="text-xl font-bold">{data.backlogs}</p>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h2>Assignment Score</h2>
                <p className="text-xl font-bold">{data.assignmentScore}%</p>
              </div>
            </div>

            {/* CONSTRAINTS */}
            <div className="bg-white p-4 rounded shadow mb-6">
              <h2 className="text-xl font-bold mb-4">
                Academic Audit Constraints
              </h2>

              {constraints.map((c, i) => (
                <div key={i} className="flex justify-between mb-2">
                  <span>{c.label}</span>
                  <span className={c.value ? "text-green-600" : "text-red-600"}>
                    {c.value ? "✔ Passed" : "✖ Failed"}
                  </span>
                </div>
              ))}
            </div>

            {/* AI INSIGHTS */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4">
                AI Insights & Recommendations
              </h2>

              {getInsights(data).map((insight, i) => (
                <p key={i}>{insight}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InstitutionalOverview;
