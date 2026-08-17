import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

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

  /* =====================================================
     HANDLE INPUT
  ====================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     LOGIN
  ====================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      console.log("Attempting admin login...");

      /*
        api.js already contains:

        https://promoter-backend-v2jk.onrender.com/api

        Therefore this request becomes:

        https://promoter-backend-v2jk.onrender.com/api/token/
      */

      const response = await api.post("/token/", {
        username: formData.username,
        password: formData.password,
      });

      console.log("Login response:", response.data);

      const { access, refresh } = response.data;

      if (!access) {
        throw new Error("Access token was not returned.");
      }

      /* Save JWT tokens */

      localStorage.setItem("access", access);

      if (refresh) {
        localStorage.setItem("refresh", refresh);
      }

      console.log("Access token saved.");

      /* Redirect to dashboard */

      navigate("/admin/dashboard", {
        replace: true,
      });

    } catch (error) {
      console.error("Admin login error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        if (error.response.status === 401) {
          setError("Invalid username or password.");
        } else if (error.response.status === 404) {
          setError(
            "Login service could not be found. Check the backend API URL."
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
        setError(
          error.message || "An unexpected error occurred."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Back to Website */}

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

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
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
              "
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
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