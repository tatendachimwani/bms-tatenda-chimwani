import { Link } from "react-router-dom";
import { BookOpen, Home, LogOut } from "lucide-react";
import { useAuth } from "../context/useAuth";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">

      {/* Logo */}
      <div className="p-6 text-xl font-bold text-blue-600 border-b">
        📚 Book System
      </div>

      {/* Links */}
      <nav className="flex-1 p-4 space-y-3">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
        >
          <Home size={18} />
          Dashboard
        </Link>

        <Link
          to="/books"
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
        >
          <BookOpen size={18} />
          Books
        </Link>

      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 p-4 text-red-500 hover:bg-red-50"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
}