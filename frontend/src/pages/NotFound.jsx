import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 text-white px-4">
      <h1 className="text-8xl font-bold mb-4">404</h1>

      <h2 className="text-3xl font-semibold mb-3">Page Not Found</h2>

      <p className="text-gray-300 text-center max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
