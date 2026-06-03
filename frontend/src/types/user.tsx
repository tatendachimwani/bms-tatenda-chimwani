import { useState, useEffect } from "react";
import api from "../services/api";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "pending" | "active" | "rejected";
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get<User[]>("/users"); // 👈 IMPORTANT FIX
        setUsers(res.data?? []);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((u) => (
        <div key={u.id}>
          {u.name} - {u.email}
        </div>
      ))}
    </div>
  );
}