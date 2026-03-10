function Navbar() {
  return (
    <div className="bg-blue-900 text-white h-16 flex items-center justify-between px-8 shadow-md">
      <div className="text-lg font-semibold">
        AI-Powered Academic Audit System
      </div>

      <div className="flex items-center gap-6">
        <div className="bg-blue-800 px-4 py-1 rounded-full text-sm">
          Welcome, <span className="font-semibold">Admin</span>
        </div>

        <div className="flex items-center gap-1">
          🔔 <span>3 Alerts</span>
        </div>

        <button className="bg-blue-700 px-4 py-1 rounded hover:bg-blue-600 transition">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
