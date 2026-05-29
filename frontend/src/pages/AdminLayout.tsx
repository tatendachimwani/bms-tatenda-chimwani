import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-4">
        <h2 className="text-xl mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/admin" end>Books</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}