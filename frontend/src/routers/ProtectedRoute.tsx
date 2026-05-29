import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Props = {
  allowedRoles?: ("admin" | "user")[];
};

export default function ProtectedRoute({ allowedRoles }: Props) {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // ✅ FIXED
  }

  return <Outlet />;
}