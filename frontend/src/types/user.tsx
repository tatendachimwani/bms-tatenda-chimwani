import { useState, useEffect } from "react";
import api from "../services/api";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status?: "pending" | "active";
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]); // ✅ THIS FIXES IT

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get<User[]>("/admin/users");
      setUsers(res.data);
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