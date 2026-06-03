import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "pending" | "active" | "rejected";
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ LOAD USERS
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

 useEffect(() => {
  const loadUsers = async () => {
    setLoading(true);

    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  loadUsers();
}, []);

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

  // ⭐ PROMOTE USER
  const promoteUser = async (id: number) => {
    try {
      await api.patch(`/users/${id}/approve`);
      fetchUsers();
    } catch (err) {
      console.error("Promote failed:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {loading && <p>Loading users...</p>}

      {!loading && users.length === 0 && (
        <p>No users found</p>
      )}

      <div className="grid gap-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            {/* USER INFO */}
            <div>
              <p className="font-semibold">{u.name}</p>
              <p>{u.email}</p>

              {/* STATUS BADGE */}
              <p className="text-sm mt-1">
                Role: {u.role} | Status:{" "}
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    u.status === "active"
                      ? "bg-green-100 text-green-700"
                      : u.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {u.status === "active"
                    ? "Approved"
                    : u.status === "pending"
                    ? "Pending"
                    : "Rejected"}
                </span>
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 items-center">
              {/* PENDING ACTIONS */}
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

              {/* PROMOTE */}
              {u.status === "active" && u.role === "user" && (
                <button
                  onClick={() => promoteUser(u.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Promote
                </button>
              )}

              {/* EDIT (ALWAYS AVAILABLE) */}
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