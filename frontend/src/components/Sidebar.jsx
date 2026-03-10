import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white min-h-[calc(100vh-64px)] p-6">
      <h2 className="text-xl font-semibold mb-8">Admin Panel</h2>

      <ul className="space-y-6">
        <li>
          <Link
            to="/"
            className="block hover:bg-blue-800 p-2 rounded transition"
          >
            📊 Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/student"
            className="block hover:bg-blue-800 p-2 rounded transition"
          >
            👨‍🎓 Student Reports
          </Link>
        </li>

        <li>
          <Link
            to="/faculty"
            className="block hover:bg-blue-800 p-2 rounded transition"
          >
            👨‍🏫 Faculty Reports
          </Link>
        </li>

        <li>
          <Link
            to="/institution"
            className="block hover:bg-blue-800 p-2 rounded transition"
          >
            🏫 Institution Analysis
          </Link>
        </li>

        <li>
          <Link
            to="/audit"
            className="block hover:bg-blue-800 p-2 rounded transition"
          >
            📄 Audit Reports
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
