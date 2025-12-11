import { Link, useLocation } from 'react-router';

const DashboardSidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900 min-h-screen p-4 shadow-2xl">
      {/* Sidebar Header */}
      <div className="mb-6 px-4 py-3">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Dashboard
        </h2>
      </div>

      <ul className="menu space-y-2">
        {/* User Dashboard Section */}
        <li className="menu-title">
          <span className="text-indigo-200 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            User Dashboard
          </span>
        </li>
        <li>
          <Link 
            to="/dashboard" 
            className={`px-1 py-1 
              flex items-center gap-3 rounded-lg transition-all ${
              isActive('/dashboard') 
                ? 'bg-white text-indigo-900 font-semibold shadow-lg' 
                : 'text-white hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard Home
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard/profile" 
            className={`px-1 py-1 flex items-center gap-3 rounded-lg transition-all ${
              isActive('/dashboard/profile') 
                ? 'bg-white text-indigo-900 font-semibold shadow-lg' 
                : 'text-white hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard/orders" 
            className={`px-1 py-1 flex items-center gap-3 rounded-lg transition-all ${
              isActive('/dashboard/orders') 
                ? 'bg-white text-indigo-900 font-semibold shadow-lg' 
                : 'text-white hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            My Orders
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard/invoices" 
            className={`px-1 py-1 flex items-center gap-3 rounded-lg transition-all ${
              isActive('/dashboard/invoices') 
                ? 'bg-white text-indigo-900 font-semibold shadow-lg' 
                : 'text-white hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Invoices
          </Link>
        </li>
        
        {/* Librarian Dashboard Section */}
        <li className="menu-title mt-6">
          <span className="text-blue-200 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Librarian
          </span>
        </li>
        <li>
          <Link 
            to="/dashboard/librarian" 
            className={`px-1 py-1 flex items-center gap-3 rounded-lg transition-all ${
              isActive('/dashboard/librarian') 
                ? 'bg-white text-indigo-900 font-semibold shadow-lg' 
                : 'text-white hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Librarian Home
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard/manage-books" 
            className={`px-1 py-1 flex items-center gap-3 rounded-lg transition-all ${
              isActive('/dashboard/manage-books') 
                ? 'bg-white text-indigo-900 font-semibold shadow-lg' 
                : 'text-white hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Manage Books
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard/add-book" 
            className={`px-1 py-1 flex items-center gap-3 rounded-lg transition-all ${
              isActive('/dashboard/add-book') 
                ? 'bg-white text-indigo-900 font-semibold shadow-lg' 
                : 'text-white hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Book
          </Link>
        </li>
        
        {/* Admin Dashboard Section */}
        <li className="menu-title mt-6">
          <span className="text-red-200 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Admin
          </span>
        </li>
        <li>
          <Link 
            to="/dashboard/admin" 
            className={`px-1 py-1 flex items-center gap-3 rounded-lg transition-all ${
              isActive('/dashboard/admin') 
                ? 'bg-white text-indigo-900 font-semibold shadow-lg' 
                : 'text-white hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Admin Home
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard/manage-users" 
            className={`px-1 py-1 flex items-center gap-3 rounded-lg transition-all ${
              isActive('/dashboard/manage-users') 
                ? 'bg-white text-indigo-900 font-semibold shadow-lg' 
                : 'text-white hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Users
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard/reports" 
            className={`px-1 py-1 flex items-center gap-3 rounded-lg transition-all ${
              isActive('/dashboard/reports') 
                ? 'bg-white text-indigo-900 font-semibold shadow-lg' 
                : 'text-white hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Reports
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
