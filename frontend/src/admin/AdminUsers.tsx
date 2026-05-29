import { useEffect, useState } from "react";
import api from "../services/api";

type User = {
  id: string;
  email: string;
  status: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);

  // 🔄 Load all users from backend API
  const loadUsers = async () => {
    try {
      // 📡 Fetch users from /users endpoint
      const res = await api.get<User[]>("/users/");
      
      // 💾 Store users in state
      setUsers(res.data);
    } catch (error) {
      // ❌ Handle API errors
      console.error("Failed to load users:", error);
    }
  };

  useEffect(() => {
    // 🚀 Fetch users when component mounts
    const fetchUsers = async () => {
      try {
        // 📡 Call backend API to get all users
        const res = await api.get<User[]>("/users/");
        
        // 💾 Save users into state
        setUsers(res.data);
      } catch (error) {
        // ❌ Log any errors
        console.error(error);
      }
    };

    // ▶️ Run fetch on page load
    fetchUsers();
  }, []);

  // ✅ Approve user and set status to active
  const approveUser = async (id: string) => {
    try {
      // 🟢 Debug log for approve action
      console.log("Approving user:", id);

      // 📡 Send PATCH request to update status
      const res = await api.patch(`/users/${id}/status`, {
        status: "active",
      });

      // 📄 Log backend response
      console.log("Approve response:", res.data);

      // 🔄 Refresh user list after update
      await loadUsers();
    } catch (error) {
      // ❌ Handle approve errors
      console.error("Approve failed:", error);
    }
  };

  // ❌ Reject user and update status
  const rejectUser = async (id: string) => {
    try {
      // 🟥 Debug log for reject action
      console.log("Rejecting user:", id);

      // 📡 Send PATCH request to reject user
      const res = await api.patch(`/users/${id}/reject`);

      // 📄 Log backend response
      console.log("Reject response:", res.data);

      // 🔄 Refresh user list after update
      await loadUsers();
    } catch (error) {
      // ❌ Handle reject errors
      console.error("Reject failed:", error);
    }
  };

  return (
    <div className="p-6">
      {/* 📌 Page Title */}
      <h2 className="text-2xl font-bold mb-6">Pending Users</h2>

      {/* 📭 Show message if no users exist */}
      {users.length === 0 ? (
        <p>No pending users found.</p>
      ) : (
        // 📋 Render users list
        users.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between p-4 border rounded-lg mb-3"
          >
            {/* 👤 User Info */}
            <div>
              <p className="font-semibold">{u.email}</p>
              <p className="text-sm text-gray-500">
                Status: {u.status}
              </p>
            </div>

            {/* 🎛️ Action Buttons */}
            <div className="flex gap-2">
              {/* 🟢 Approve Button */}
              <button
                onClick={() => approveUser(u.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>

              {/* 🔴 Reject Button */}
              <button
                onClick={() => rejectUser(u.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}