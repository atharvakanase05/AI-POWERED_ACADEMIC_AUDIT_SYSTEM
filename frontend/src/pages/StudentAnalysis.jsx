
// import { useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend
// );

// export default function StudentAnalysis() {
//   const [rollNo, setRollNo] = useState("");
//   const [student, setStudent] = useState(null);
//   const [placement, setPlacement] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const API = "http://localhost:8000"; // ✅ FIXED

//   // ================= FETCH =================
//   const fetchStudent = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       console.log("Fetching student...");

//       const res = await fetch(`${API}/student/${rollNo}`);

//       if (!res.ok) {
//         throw new Error("Student API failed");
//       }

//       const data = await res.json();
//       console.log("Student:", data);

//       setStudent(data);

//       const p = await fetch(`${API}/placement/${rollNo}`);
//       const pdata = await p.json();

//       console.log("Placement:", pdata);

//       setPlacement(pdata);
//       setResult(null);

//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch student data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= AI =================
//   const runAI = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch(`${API}/analyze`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ roll_no: rollNo }),
//       });

//       if (!res.ok) {
//         throw new Error("AI API failed");
//       }

//       const data = await res.json();
//       console.log("AI:", data);

//       setResult(data);

//     } catch (err) {
//       console.error(err);
//       setError("AI failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">

//       <h1 className="text-3xl font-bold text-center mb-6">
//         AI Academic Dashboard
//       </h1>

//       {/* INPUT */}
//       <div className="flex justify-center gap-3 mb-6">
//         <input
//           value={rollNo}
//           onChange={(e) => setRollNo(e.target.value)}
//           className="border p-2 rounded"
//           placeholder="Enter Roll No (CS001)"
//         />

//         <button onClick={fetchStudent} className="bg-blue-500 text-white p-2 rounded">
//           Fetch
//         </button>

//         <button onClick={runAI} className="bg-green-500 text-white p-2 rounded">
//           Run AI
//         </button>

//         <button
//           onClick={() => window.open(`${API}/students/report/all`)}
//           className="bg-purple-500 text-white p-2 rounded"
//         >
//           Students PDF
//         </button>

//         <button
//           onClick={() => window.open(`${API}/placement/report/2025`)}
//           className="bg-red-500 text-white p-2 rounded"
//         >
//           Placement PDF
//         </button>
//       </div>

//       {/* LOADING */}
//       {loading && <p className="text-center text-blue-600">Loading...</p>}

//       {/* ERROR */}
//       {error && <p className="text-center text-red-600">{error}</p>}

//       {/* CARDS */}
//       <div className="grid grid-cols-3 gap-4">

//         {student && (
//           <div className="bg-white p-4 shadow rounded">
//             <h2 className="font-bold">Student</h2>
//             <p>Name: {student.name}</p>
//             <p>Marks: {student.marks}</p>
//             <p>GPA: {student.gpa}</p>
//           </div>
//         )}

//         {placement && (
//           <div className="bg-white p-4 shadow rounded">
//             <h2 className="font-bold">Placement</h2>
//             <p>Status: {placement.status || "N/A"}</p>
//             <p>Company: {placement.company_name || "-"}</p>
//           </div>
//         )}

//         {result && (
//           <div className="bg-white p-4 shadow rounded">
//             <h2 className="font-bold">AI Result</h2>
//             <p>Risk: {result.risk_level}</p>
//             <p>Confidence: {result.confidence}%</p>
//           </div>
//         )}

//       </div>

//       {/* CHARTS */}
//       {student && result && (
//         <div className="grid grid-cols-2 gap-6 mt-6">

//           <Bar
//             data={{
//               labels: ["Attendance", "Marks", "GPA"],
//               datasets: [{
//                 label: "Performance",
//                 data: [
//                   student.attendance,
//                   student.marks,
//                   student.gpa * 10
//                 ]
//               }]
//             }}
//           />

//           <Pie
//             data={{
//               labels: ["Confidence", "Risk"],
//               datasets: [{
//                 data: [
//                   result.confidence,
//                   100 - result.confidence
//                 ]
//               }]
//             }}
//           />

//         </div>
//       )}

//     </div>
//   );
// }
///woring -

// import { useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend
// );

// export default function StudentAnalysis() {
//   const [rollNo, setRollNo] = useState("");
//   const [student, setStudent] = useState(null);
//   const [result, setResult] = useState(null);
//   const [placement, setPlacement] = useState(null);
//   const [error, setError] = useState("");

//   const API = "http://127.0.0.1:8000";

//   const fetchStudent = async () => {
//     try {
//       setError("");

//       const res = await fetch(`${API}/student/${rollNo}`);
//       if (!res.ok) throw new Error("Student not found");

//       const data = await res.json();
//       setStudent(data);

//       const p = await fetch(`${API}/placement/${rollNo}`);
//       setPlacement(await p.json());

//     } catch (err) {
//       setError(err.message);
//       setStudent(null);
//     }
//   };

//   const runAI = async () => {
//     try {
//       setError("");

//       const res = await fetch(`${API}/analyze`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ roll_no: rollNo }),
//       });

//       const data = await res.json();
//       setResult(data);

//     } catch (err) {
//       setError("AI failed");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">

//       <h1 className="text-3xl font-bold text-center mb-6">
//         AI Academic Dashboard
//       </h1>

//       <div className="flex justify-center gap-3 mb-6">
//         <input
//           value={rollNo}
//           onChange={(e) => setRollNo(e.target.value)}
//           className="border p-2 rounded"
//           placeholder="Enter Roll No"
//         />

//         <button onClick={fetchStudent} className="bg-blue-500 text-white p-2 rounded">
//           Fetch
//         </button>

//         <button onClick={runAI} className="bg-green-500 text-white p-2 rounded">
//           Run AI
//         </button>

//         <button onClick={() => window.open(`${API}/students/report/all`)}
//           className="bg-purple-500 text-white p-2 rounded">
//           Students PDF
//         </button>

//         <button onClick={() => window.open(`${API}/placement/report/2025`)}
//           className="bg-red-500 text-white p-2 rounded">
//           Placement PDF
//         </button>
//       </div>

//       {error && <p className="text-red-500 text-center">{error}</p>}

//       <div className="grid grid-cols-3 gap-4">

//         {student && (
//           <div className="bg-white p-4 shadow rounded">
//             <h2 className="font-bold">Student</h2>
//             <p>{student.name}</p>
//             <p>Marks: {student.marks}</p>
//             <p>GPA: {student.gpa}</p>
//           </div>
//         )}

//         {placement && (
//           <div className="bg-white p-4 shadow rounded">
//             <h2 className="font-bold">Placement</h2>
//             <p>{placement.status}</p>
//             <p>{placement.company_name}</p>
//           </div>
//         )}

//         {result && (
//           <div className="bg-white p-4 shadow rounded">
//             <h2 className="font-bold">AI Result</h2>
//             <p>{result.risk_level}</p>
//             <p>{result.confidence}%</p>
//           </div>
//         )}

//       </div>

//       {student && result && (
//         <div className="grid grid-cols-2 gap-6 mt-6">

//           <Bar
//             data={{
//               labels: ["Attendance", "Marks", "GPA"],
//               datasets: [{
//                 label: "Performance",
//                 data: [
//                   student.attendance,
//                   student.marks,
//                   student.gpa * 10
//                 ],
//               }],
//             }}
//           />

// //           <Pie
//             data={{
//               labels: ["Confidence", "Risk"],
//               datasets: [{
//                 data: [result.confidence, 100 - result.confidence],
//               }],
//             }}
//           />

//         </div>
//       )}

//     </div>
//   );
// }


import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function StudentAnalysis() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [result, setResult] = useState(null);
  const [placement, setPlacement] = useState(null);
  const [error, setError] = useState("");

  const API = "http://127.0.0.1:8000";

  const fetchStudent = async () => {
    try {
      setError("");

      const res = await fetch(`${API}/student/${rollNo}`);
      if (!res.ok) throw new Error("Student not found");

      const data = await res.json();
      setStudent(data);

      const p = await fetch(`${API}/placement/${rollNo}`);
      setPlacement(await p.json());

    } catch (err) {
      setError(err.message);
      setStudent(null);
    }
  };

  const runAI = async () => {
    try {
      setError("");

      const res = await fetch(`${API}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roll_no: rollNo }),
      });

      const data = await res.json();
      setResult(data);

    } catch (err) {
      setError("AI failed");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-center mb-6">
        AI Academic Dashboard
      </h1>

      <div className="flex justify-center gap-3 mb-6">
        <input
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          className="border p-2 rounded"
          placeholder="Enter Roll No"
        />

        <button onClick={fetchStudent} className="bg-blue-500 text-white p-2 rounded">
          Fetch
        </button>

        <button onClick={runAI} className="bg-green-500 text-white p-2 rounded">
          Run AI
        </button>

        <button onClick={() => window.open(`${API}/students/report/all`)}
          className="bg-purple-500 text-white p-2 rounded">
          Students PDF
        </button>

        <button onClick={() => window.open(`${API}/placement/report/2025`)}
          className="bg-red-500 text-white p-2 rounded">
          Placement PDF
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-3 gap-4">

        {student && (
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold">Student</h2>
            <p>{student.name}</p>
            <p>Marks: {student.marks}</p>
            <p>GPA: {student.gpa}</p>
          </div>
        )}

        {placement && (
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold">Placement</h2>
            <p>{placement.status}</p>
            <p>{placement.company_name}</p>
          </div>
        )}

        {result && (
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold">AI Result</h2>
            <p>{result.risk_level}</p>
            <p>{result.confidence}%</p>
          </div>
        )}

      </div>

      {student && result && (
        <div className="grid grid-cols-2 gap-6 mt-6">

          <Bar
            data={{
              labels: ["Attendance", "Marks", "GPA"],
              datasets: [{
                label: "Performance",
                data: [
                  student.attendance,
                  student.marks,
                  student.gpa * 10
                ],
              }],
            }}
          />

          
          <Pie
            data={{
              labels: ["Confidence", "Risk"],
              datasets: [{
                data: [result.confidence, 100 - result.confidence],
              }],
            }}
          />
          {result && (
          <div className="bg-white p-4 shadow rounded mt-6">
            <h2 className="font-bold">Performance Summary</h2>
            <p className="text-gray-600 mt-2">
              {result.summary}
            </p>
          </div>
          )}

        </div>
      )}

    </div>
  );
}