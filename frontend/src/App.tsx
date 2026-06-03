import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./routers/ProtectedRoute";
import RoleRoute from "./routers/RoleRoute";

import AdminLayout from "./admin/AdminLayout";
import AdminBooks from "./admin/AdminBooks";
import AdminUsers from "./admin/AdminUsers";

import UserDashboard from "./pages/UserDashboard";
import EditUser from "./pages/EditUser";

export default function App() {
  return (
    <Routes>
      {/* 🌍 PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔐 PRIVATE ROUTES (ANY LOGGED USER) */}
      <Route element={<ProtectedRoute />}>
        {/* 👤 USER DASHBOARD */}
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* 🛠 ADMIN AREA */}
        <Route element={<RoleRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminBooks />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id/edit" element={<EditUser />} />
          </Route>
        </Route>
      </Route>

      {/* 🚨 CATCH ALL (NO MORE 404 BLANK PAGE) */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}
