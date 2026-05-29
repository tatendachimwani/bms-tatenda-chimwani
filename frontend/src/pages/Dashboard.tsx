import { useAuth } from '../context/useAuth';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.status === "pending") {
    return <p>Your account is waiting for approval...</p>;
  }

  return user.role === "admin"
    ? <AdminDashboard />
    : <UserDashboard />;
}