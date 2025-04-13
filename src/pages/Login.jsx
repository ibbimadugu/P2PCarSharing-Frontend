import { useState } from "react";
import API from "../api"; // Import the API instance
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", { email, password });

      // Save JWT token to localStorage
      localStorage.setItem("token", res.data.token);

      dispatch(setUser(res.data.user));

      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <div className="absolute inset-0 bg-black"></div>
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full text-white p-8 rounded-lg shadow-lg">
          <h2
            className="text-3xl mb-6 text-center"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin} className="space-y-6 text-white">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-lg font-semibold transition duration-300">
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
