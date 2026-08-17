import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaUserShield,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = (
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000/api"
  ).replace(/\/+$/, "");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const loginURL = `${API_URL}/token/`;

    console.log("API URL:", API_URL);
    console.log("Login URL:", loginURL);

    try {
      const response = await axios.post(
        loginURL,
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful");

      const { access, refresh } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        if (error.response.status === 401) {
          setError("Invalid username or password.");
        } else if (error.response.status === 404) {
          setError(
            "Login service could not be found. Please check the backend API configuration."
          );
        } else {
          setError(
            error.response.data?.detail ||
              "Login failed. Please try again."
          );
        }
      } else if (error.request) {
        setError(
          "The backend server could not be reached. Please try again."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-500 mb-6 transition"
        >
          <FaArrowLeft />
          Back to website
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-slate-900 text-white px-8 py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center">
              <FaUserShield className="text-2xl" />
            </div>

            <h1 className="text-2xl font-bold">
              Admin Login
            </h1>

            <p className="text-slate-300 mt-2 text-sm">
              Young Entrepreneurs Hub
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Username */}
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Username
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter admin username"
                  required
                  autoComplete="username"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-12 py-3 border border-slate-300 rounded-lg outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-slate-900 py-3 rounded-lg font-bold transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <div className="border-t border-slate-100 px-8 py-5 text-center">
            <p className="text-xs text-slate-400">
              Authorized administrators only
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}