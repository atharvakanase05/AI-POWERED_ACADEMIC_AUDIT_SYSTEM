import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentAnalysis from "./pages/StudentAnalysis";
import FacultyAnalysis from "./pages/FacultyAnalysis";
import Institutional from "./pages/Institutional";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/student" element={<StudentAnalysis />} />
      <Route path="/faculty" element={<FacultyAnalysis />} />
      <Route path="/institution" element={<Institutional />} />
    </Routes>
  );
}

export default App;
