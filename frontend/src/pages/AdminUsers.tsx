import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

type User = {
  id: number;
  email: string;
  role: "admin" | "user";
  status: "pending" | "active" | "rejected";
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // ✅ LOAD ALL USERS
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get<User[]>("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ APPROVE USER
  const approveUser = async (id: number) => {
    try {
      await api.patch(`/users/${id}/status`, {
        status: "active",
      });

      fetchUsers();
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  // ❌ REJECT USER
  const rejectUser = async (id: number) => {
    try {
      await api.patch(`/users/${id}/status`, {
        status: "rejected",
      });

      fetchUsers();
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  // ⭐ PROMOTE TO ADMIN
  const promoteUser = async (id: number) => {
    try {
      await api.patch(`/users/${id}/approve`);

      fetchUsers();
    } catch (err) {
      console.error("Promote failed:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {loading && <p>Loading users...</p>}

      <div className="grid gap-3">
        {users.length === 0 && !loading && (
          <p>No users found</p>
        )}

        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            {/* USER INFO */}
            <div>
              <p className="font-semibold">{u.email}</p>

              <p className="text-sm text-gray-600">
                Role: {u.role} | Status:{" "}
                <span
                  className={
                    u.status === "active"
                      ? "text-green-600"
                      : u.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {u.status}
                </span>
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              {u.status === "pending" && (
                <>
                  <button
                    onClick={() => approveUser(u.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectUser(u.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </>
              )}

              {u.status === "active" && u.role === "user" && (
                <button
                  onClick={() => promoteUser(u.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Promote to Admin
                </button>
              )}

               <button
                onClick={() => navigate(`/admin/users/${u.id}/edit`)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}