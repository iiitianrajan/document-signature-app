import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BadgeCheck } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration Failed"
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
              Securely upload, manage,
              preview and sign PDF
              documents.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BadgeCheck />
                <span>
                  JWT Authentication
                </span>
              </div>

              <div className="flex items-center gap-3">
                <BadgeCheck />
                <span>
                  Secure PDF Uploads
                </span>
              </div>

              <div className="flex items-center gap-3">
                <BadgeCheck />
                <span>
                  Document Management
                </span>
              </div>

              <div className="flex items-center gap-3">
                <BadgeCheck />
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
              Create Account
            </h2>

            <p className="text-gray-500 mb-8">
              Create your account to
              start signing documents
            </p>

            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-green-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}