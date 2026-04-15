// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import StudentAnalysis from "./pages/StudentAnalysis";
// import FacultyAnalysis from "./pages/FacultyAnalysis";
// import Institutional from "./pages/Institutional";
// import AuditReport from "./pages/AuditReport";
// import Publications from "./pages/Publications";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/student" element={<StudentAnalysis />} />
//       <Route path="/faculty" element={<FacultyAnalysis />} />
//       <Route path="/institution" element={<Institutional />} />
//       <Route path="/report" element={<AuditReport />} />
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentAnalysis from "./pages/StudentAnalysis";
import FacultyAnalysis from "./pages/FacultyAnalysis";
import AuditReport from "./pages/AuditReport";
import Publications from "./pages/Publications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/student" element={<StudentAnalysis />} />
      <Route path="/faculty" element={<FacultyAnalysis />} />
      <Route path="/report" element={<AuditReport />} />
      <Route path="/publications" element={<Publications />} />
    </Routes>
  );
}

export default App;

