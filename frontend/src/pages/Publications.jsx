// import { useEffect, useState } from "react";
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

// export default function Publications() {
//   const [data, setData] = useState([]);

//   const API = "http://127.0.0.1:8000";

// //   useEffect(() => {
// //     fetch(`${API}/publications/report`)
// //       .then((res) => res.json())
// //       .then((res) => {
// //         // ✅ FIX: backend returns ARRAY directly
// //         setData(res);
// //       })
// //       .catch((err) => console.log(err));
// //   }, []);

//   useEffect(() => {
//   fetch("http://127.0.0.1:8000/publications/report")
//     .then((res) => res.json())
//     .then((res) => {
//       setData(Array.isArray(res) ? res : []);
//     })
//     .catch((err) => console.log(err));
// }, []);
//   const total = data.length;

//   const published = data.filter((d) => d.status === "Published").length;
//   const inReview = total - published;

//   const yearMap = {};
//   data.forEach((d) => {
//     yearMap[d.publication_year] =
//       (yearMap[d.publication_year] || 0) + 1;
//   });

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">

//       <h1 className="text-3xl font-bold text-center mb-6">
//         Publications Dashboard
//       </h1>

//       {/* TABLE */}
//       <div className="bg-white p-4 rounded shadow overflow-x-auto">
//         <table className="w-full border">
//           <thead className="bg-gray-200">
//             <tr>
//               <th>ID</th>
//               <th>Roll No</th>
//               <th>Student</th>
//               <th>Paper</th>
//               <th>Journal</th>
//               <th>Year</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.map((row, i) => (
//               <tr key={i} className="text-center border-t">
//                 <td>{row.id}</td>
//                 <td>{row.roll_no}</td>
//                 <td>{row.student_name}</td>
//                 <td>{row.paper_title}</td>
//                 <td>{row.journal_name}</td>
//                 <td>{row.publication_year}</td>
//                 <td>{row.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* CHARTS */}
//       <div className="grid grid-cols-2 gap-6 mt-6">

//         <div className="bg-white p-4 rounded shadow">
//           <Pie
//             data={{
//               labels: ["Published", "In Review"],
//               datasets: [
//                 {
//                   data: [published, inReview],
//                 },
//               ],
//             }}
//           />
//         </div>

//         <div className="bg-white p-4 rounded shadow">
//           <Bar
//             data={{
//               labels: Object.keys(yearMap),
//               datasets: [
//                 {
//                   label: "Publications per Year",
//                   data: Object.values(yearMap),
//                 },
//               ],
//             }}
//           />
//         </div>
//       </div>

//       {/* SUMMARY */}
//       <div className="bg-white p-4 rounded shadow mt-6">
//         <h2 className="font-bold text-lg">Summary</h2>

//         <p>Total: {total}</p>
//         <p>Published: {published}</p>
//         <p>In Review: {inReview}</p>

//         <p className="mt-2 text-gray-600">
//           {published / (total || 1) > 0.7
//             ? "Excellent research output."
//             : published / (total || 1) > 0.4
//             ? "Moderate research activity."
//             : "Low research output, needs improvement."}
//         </p>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
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

export default function Publications() {
  const [data, setData] = useState([]);

  const API = "http://127.0.0.1:8000";

  // ✅ FETCH DATA
//   useEffect(() => {
//     fetch(`${API}/publications/report`)
//       .then((res) => res.json())
//       .then((res) => {
//         console.log("Publications API:", res);
//         setData(Array.isArray(res) ? res : []);
//       })
//       .catch((err) => console.log(err));
//   }, []);
    useEffect(() => {
    fetch(`${API}/publications`)
        .then((res) => res.json())
        .then((res) => {
        console.log("DATA:", res);
        setData(Array.isArray(res) ? res : []);
        })
        .catch((err) => console.log(err));
    }, []);
  // ================= STATS =================
  const total = data.length;

  const published = data.filter((d) => d.status === "Published").length;
  const inReview = total - published;

  // ================= YEAR MAP =================
  const yearMap = data.reduce((acc, item) => {
    acc[item.publication_year] =
      (acc[item.publication_year] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-center mb-6">
        Publications Dashboard
      </h1>

      {/* ================= TABLE ================= */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-2">ID</th>
              <th>Roll No</th>
              <th>Student</th>
              <th>Paper</th>
              <th>Journal</th>
              <th>Year</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No Data Found
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="text-center border-t">
                  <td>{row.id}</td>
                  <td>{row.roll_no}</td>
                  <td>{row.student_name}</td>
                  <td>{row.paper_title}</td>
                  <td>{row.journal_name}</td>
                  <td>{row.publication_year}</td>
                  <td>{row.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-2 gap-6 mt-6">

        {/* PIE */}
        <div className="bg-white p-4 rounded shadow">
          <Pie
            data={{
              labels: ["Published", "In Review"],
              datasets: [
                {
                  data: [published, inReview],
                  backgroundColor: ["#22C55E", "#F59E0B"],
                },
              ],
            }}
          />
        </div>

        {/* BAR */}
        <div className="bg-white p-4 rounded shadow">
          <Bar
            data={{
              labels: Object.keys(yearMap),
              datasets: [
                {
                  label: "Publications per Year",
                  data: Object.values(yearMap),
                  backgroundColor: "#1E3A8A",
                },
              ],
            }}
          />
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="font-bold text-lg">Summary</h2>

        <p>Total Publications: {total}</p>
        <p>Published: {published}</p>
        <p>In Review: {inReview}</p>

        <p className="mt-2 text-gray-600">
          {total === 0
            ? "No data available."
            : published / total > 0.7
            ? "Excellent research output."
            : published / total > 0.4
            ? "Moderate research activity."
            : "Low research output, needs improvement."}
        </p>
      </div>
    </div>
  );
}