import AdminBooks from './AdminBooks';
import AdminUsers from './AdminUsers';

export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin Panel</h2>

      <AdminUsers />
      <AdminBooks />
    </div>
  );
}