import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "pending" | "active" | "rejected";
};

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const userId = Number(id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (!isNaN(userId)) {
      fetchUser();
    }
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!user) return;

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!user) return;

    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Update user details
      await api.patch(`/users/${userId}`, {
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });

      // Reset password if provided
      if (password.trim()) {
        await api.patch(`/users/${userId}/reset-password`, {
          password,
        });
      }

      alert("User updated successfully");
      navigate("/admin/users");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update user");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white px-3 py-1 rounded mb-4"
      >
        Close
      </button>

      <h2 className="text-xl font-bold mb-4">Edit User</h2>

      <input
        name="name"
        value={user.name}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
        placeholder="Name"
      />

      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
        placeholder="Email"
      />

      <select
        name="role"
        value={user.role}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <select
        name="status"
        value={user.status}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="pending">Pending</option>
        <option value="active">Active</option>
        <option value="rejected">Rejected</option>
      </select>

      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        placeholder="New Password"
      />

      <input
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
        placeholder="Confirm Password"
      />

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        Show Password
      </label>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}