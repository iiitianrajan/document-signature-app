import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {BadgeCheck} from "lucide-react"
import API_BASE_URL from "../config/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res =
        await axios.post(
          `${API_BASE_URL}/api/auth/login`,
          formData
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center p-12 text-white">
          <div>
            <h1 className="text-5xl font-bold mb-6">
              Document Signature Platform
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              Securely upload,
              manage, preview and
              sign PDF documents.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span><BadgeCheck/></span>
                <span>
                  JWT Authentication
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span><BadgeCheck/></span>
                <span>
                  Secure PDF Uploads
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span><BadgeCheck/></span>
                <span>
                  Document Management
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span><BadgeCheck/></span>
                <span>
                  Digital Signature
                  Workflow
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>

            <p className="text-gray-500 mb-8">
              Login to access your
              dashboard
            </p>

            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-5"
            >
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter password"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Don't have an
              account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}