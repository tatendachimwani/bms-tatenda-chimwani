import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

        <nav className="flex flex-col gap-3">
          <NavLink
            to="/admin/books"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-gray-300"
            }
          >
            📚 Books
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-gray-300"
            }
          >
            👥 Users
          </NavLink>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="font-semibold">Dashboard</h2>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="text-red-500"
          >
            Logout
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}