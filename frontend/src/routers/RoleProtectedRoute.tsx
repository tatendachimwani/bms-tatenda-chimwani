import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Props = {
  allowedRoles?: ("admin" | "user")[];
  requireActive?: boolean;
};

export default function RoleProtectedRoute({
  allowedRoles,
  requireActive = false,
}: Props) {
  const { user, token, isLoading } = useAuth();

  // ⏳ loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ❌ not logged in
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ account not approved (status check)
  if (requireActive && user.status !== "active") {
    return (
      <Navigate
        to="/pending-approval"
        replace
      />
    );
  }

  // ❌ role check (if provided)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ allowed access
  return <Outlet />;
}