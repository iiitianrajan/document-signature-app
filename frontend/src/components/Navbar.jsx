import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="
      bg-white/10
      backdrop-blur-lg
      border-b
      border-white/20
      sticky
      top-0
      z-50
    "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          DocumentSign
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="
              text-gray-300
              hover:text-white
              transition
            "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-2
              rounded-xl
              transition
            "
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
