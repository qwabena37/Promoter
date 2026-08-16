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

  const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

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

    try {
      const response = await axios.post(
        `${API_URL}/token/`,
        {
          username: formData.username,
          password: formData.password,
        }
      );

      const { access, refresh } = response.data;

      // Save JWT tokens
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      // Go to dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError(
          error.response?.data?.detail ||
            "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Back to website */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-500 mb-6 transition"
        >
          <FaArrowLeft />
          Back to website
        </Link>

        {/* Login Card */}
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
          <form
            onSubmit={handleSubmit}
            className="p-8"
          >

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

                <FaUser
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter admin username"
                  required
                  autoComplete="username"
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    border
                    border-slate-300
                    rounded-lg
                    outline-none
                    focus:border-amber-400
                    focus:ring-2
                    focus:ring-amber-100
                    transition
                  "
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

                <FaLock
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="
                    w-full
                    pl-11
                    pr-12
                    py-3
                    border
                    border-slate-300
                    rounded-lg
                    outline-none
                    focus:border-amber-400
                    focus:ring-2
                    focus:ring-amber-100
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    hover:text-slate-700
                  "
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-amber-400
                hover:bg-amber-500
                disabled:bg-slate-300
                disabled:cursor-not-allowed
                text-slate-900
                py-3
                rounded-lg
                font-bold
                transition
                duration-300
              "
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          {/* Footer */}
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