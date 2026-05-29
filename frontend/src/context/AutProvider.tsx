import { useEffect, useRef, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { getTokenExpiry } from "../utils/auth";
import type { User } from '../types/user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [isLoading] = useState(true);

  // ✅ MUST be inside component
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
  };

  const scheduleLogout = useCallback((token: string) => {
  const expiry = getTokenExpiry(token);
  if (!expiry) return;

  const timeLeft = expiry - Date.now();

  if (logoutTimer.current) {
    clearTimeout(logoutTimer.current);
  }

  logoutTimer.current = setTimeout(() => {
    logout();
  }, timeLeft);
}, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    scheduleLogout(token);
  };

  // 🔄 restore session
  useEffect(() => {
  const savedToken = localStorage.getItem("token");

  if (savedToken) {
    scheduleLogout(savedToken);
  }
}, [scheduleLogout]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}