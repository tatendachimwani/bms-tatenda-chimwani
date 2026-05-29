import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import AdminLayout from "../admin/AdminLayout";
import AdminBooks from "../admin/AdminBooks";
import AdminUsers from "../admin/AdminUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminBooks /> },
      { path: "books", element: <AdminBooks /> },
      { path: "users", element: <AdminUsers /> }
    ]
  }
]);

export default router;