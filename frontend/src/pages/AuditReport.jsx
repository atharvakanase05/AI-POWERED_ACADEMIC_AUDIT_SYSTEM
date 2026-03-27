import { useContext } from "react";
import { AuditContext } from "../AuditContext";

const AuditReport = () => {
  const { studentData, facultyData, institutionData } =
    useContext(AuditContext);

  const generateSummary = () => {
    let summary = [];

    if (studentData?.riskLevel === "High Risk") {
      summary.push("Student performance is critical.");
    }

    if (facultyData?.rating === "Needs Improvement") {
      summary.push("Faculty performance needs attention.");
    }

    if (institutionData?.avgAttendance < 75) {
      summary.push("Institution attendance below standard.");
    }

    if (summary.length === 0) {
      summary.push("Overall system performing well.");
    }

    return summary;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen" id="report">
      <h1 className="text-3xl font-bold text-center mb-6">
        AI Academic Audit Report
      </h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Summary</h2>

        {generateSummary().map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>

      <button
        onClick={() => window.print()}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Download Report
      </button>
    </div>
  );
};

export default AuditReport;
