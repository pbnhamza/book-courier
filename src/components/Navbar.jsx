import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    return savedTheme;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  // Use user's photoURL if available, otherwise generate avatar from name
  const userAvatar = user 
    ? (user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`)
    : '';

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully! See you soon!');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
   <section className='sticky top-0 z-50 flex justify-center items-center'>
     <nav className="navbar container bg-primary/90 backdrop-blur-md text-primary-content shadow-lg px-4 lg:px-8">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl normal-case">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          BookCourier
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-none items-center">
        <ul className="menu menu-horizontal px-1 gap-5 items-center text-sm ">
          <li>
            <Link 
              to="/" 
              className={`${isActive('/') ? 'border-b-2 border-white rounded-b-none' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/books" 
              className={` ${isActive('/books') ? 'border-b-2 border-white rounded-b-none' : ''}`}
            >
              Books
            </Link>
          </li>
          {user && (
            <li>
              <Link 
                to="/dashboard/profile" 
                className={`${isActive('/dashboard') ? 'border-b-2 border-white rounded-b-none' : ''}`}
              >
                Dashboard
              </Link>
            </li>
          )}
          
          {!user ? (
            <li><Link to="/login" className="hover:bg-white/10 rounded-lg">Login</Link></li>
          ) : (
            <li>
              <div className="dropdown dropdown-end ">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:bg-white/10">
                  <div className="w-10 rounded-full ring-2 ring-primary-content ring-offset-2 ring-offset-primary">
                    <img src={userAvatar} alt={user.name} />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-xl menu menu-sm dropdown-content bg-gray-200 dark:bg-gray-800 text-base-content rounded-xl w-56 border border-gray-200 dark:border-gray-700">
                  <li className="menu-title px-4 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg mb-2">
                    <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{user.name}</span>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400">{user.email}</span>
                  </li>
                  <li><Link to="/dashboard" className="hover:bg-indigo-600 hover:text-white rounded-lg px-2 py-2">Dashboard Home</Link></li>
                  <li><Link to="/dashboard/profile" className="hover:bg-indigo-600 hover:text-white rounded-lg px-2 py-2">Profile</Link></li>
                  <li><Link to="/dashboard/orders" className="hover:bg-indigo-600 hover:text-white rounded-lg px-2 py-2">My Orders</Link></li>
                  <li><Link to="/dashboard/invoices" className="hover:bg-indigo-600 hover:text-white rounded-lg px-2 py-2">Invoices</Link></li>
                  <div className="divider my-1"></div>
                  <li><Link onClick={handleLogout} className="hover:bg-red-500 hover:text-white rounded-lg px-2 py-2">Logout</Link></li>
                </ul>
              </div>
            </li>
          )}
          
          <li>
            <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex lg:hidden gap-2 items-center">
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
        
        <button onClick={toggleMenu} className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 text-base-content shadow-xl lg:hidden z-50 border-t-2 border-gray-200 dark:border-gray-700">
          <ul className="menu menu-vertical px-4 py-3">
            <li>
              <Link 
                to="/" 
                onClick={toggleMenu} 
                className={`rounded-lg ${isActive('/') ? 'border-l-4 border-indigo-600' : 'hover:bg-indigo-600 hover:text-white'}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/books" 
                onClick={toggleMenu} 
                className={`rounded-lg ${isActive('/books') ? 'border-l-4 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-indigo-600 hover:text-white'}`}
              >
                Books
              </Link>
            </li>
            {user && (
              <li>
                <Link 
                  to="/dashboard/profile" 
                  onClick={toggleMenu} 
                  className={`rounded-lg ${isActive('/dashboard') ? 'border-l-4 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-indigo-600 hover:text-white'}`}
                >
                  Dashboard
                </Link>
              </li>
            )}
            
            {!user ? (
              <li><Link to="/login" onClick={toggleMenu} className="hover:bg-indigo-600 hover:text-white rounded-lg">Login</Link></li>
            ) : (
              <>
                <div className="divider my-2"></div>
                <li className="menu-title px-4 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg mb-2">
                  <div className="flex items-center gap-3">
                    <img src={userAvatar} alt={user.name} className="w-10 h-10 rounded-full ring-2 ring-indigo-600" />
                    <div>
                      <span className="font-bold text-indigo-700 dark:text-indigo-300">{user.name}</span>
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 block">{user.email}</span>
                    </div>
                  </div>
                </li>
                <li><Link to="/dashboard" onClick={toggleMenu} className="hover:bg-indigo-600 hover:text-white rounded-lg">Dashboard Home</Link></li>
                <li><Link to="/dashboard/profile" onClick={toggleMenu} className="hover:bg-indigo-600 hover:text-white rounded-lg">Profile</Link></li>
                <li><Link to="/dashboard/orders" onClick={toggleMenu} className="hover:bg-indigo-600 hover:text-white rounded-lg">My Orders</Link></li>
                <li><Link to="/dashboard/invoices" onClick={toggleMenu} className="hover:bg-indigo-600 hover:text-white rounded-lg">Invoices</Link></li>
                <div className="divider my-2"></div>
                <li><a onClick={() => { handleLogout(); toggleMenu(); }} className="hover:bg-red-500 hover:text-white rounded-lg">Logout</a></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
   </section>
  );
};

export default Navbar;
