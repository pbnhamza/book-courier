import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home/Home';
import AllBooks from '../pages/Books/AllBooks';
import BookDetails from '../pages/Books/BookDetails';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import UserDashboard from '../pages/Dashboard/User/UserDashboard';
import UserProfile from '../pages/Dashboard/User/UserProfile';
import MyOrders from '../pages/Dashboard/User/MyOrders';
import Invoices from '../pages/Dashboard/User/Invoices';
import LibrarianDashboard from '../pages/Dashboard/Librarian/LibrarianDashboard';
import ManageBooks from '../pages/Dashboard/Librarian/ManageBooks';
import AddBook from '../pages/Dashboard/Librarian/AddBook';
import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';
import Reports from '../pages/Dashboard/Admin/Reports';
import NotFound from '../pages/NotFound';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: 'books', Component: AllBooks },
      { path: 'books/:id', Component: BookDetails },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: UserDashboard },
      { path: 'profile', Component: UserProfile },
      { path: 'orders', Component: MyOrders },
      { path: 'invoices', Component: Invoices },
      { path: 'librarian', Component: LibrarianDashboard },
      { path: 'manage-books', Component: ManageBooks },
      { path: 'add-book', Component: AddBook },
      { path: 'admin', Component: AdminDashboard },
      { path: 'manage-users', Component: ManageUsers },
      { path: 'reports', Component: Reports },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

export default router;
