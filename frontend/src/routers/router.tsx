import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import AdminLayout from '../admin/AdminLayout';
import AdminBooks from '../admin/AdminBooks';
import AdminUsers from '../admin/AdminUsers';
import EditUser from '../pages/EditUser';
import BookDetails from '../pages/BookDetails';
import UserDashboard from '../pages/UserDashboard';
import AdminPosts from '../admin/AdminPosts';
import Posts from '../pages/Posts';
import PostDetails from '../pages/PostDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },

  {
    path: '/books/:id',
    element: <BookDetails />
  },

  { path: 'dashboard', element: <UserDashboard /> 
  },

  {
  path: "posts",
  element: <AdminPosts />
},

{
  path: "/posts",
  element: <Posts />
},

{
  path: "/posts/:id",
  element: <PostDetails />
},
  
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminBooks /> },
      { path: 'books', element: <AdminBooks /> },
      { path: 'users', element: <AdminUsers /> },
      {path: 'users/:id/edit', element: <EditUser /> },
      { path: 'books/:id', element: <BookDetails /> },
      
    ]
  }
]);

export default router;