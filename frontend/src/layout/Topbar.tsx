import { useAuth } from "../context/useAuth";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">

      <h1 className="font-semibold text-gray-700">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600">
          {user?.name}
        </div>

        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
          {user?.name?.charAt(0)}
        </div>
      </div>

    </div>
  );
}