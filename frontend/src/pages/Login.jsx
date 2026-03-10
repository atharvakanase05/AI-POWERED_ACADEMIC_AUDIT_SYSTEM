import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          AI Academic Audit System
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
        />

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
