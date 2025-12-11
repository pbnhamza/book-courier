import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { updateProfile } from 'firebase/auth';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Profile form state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  // All Users State
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', registeredDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'librarian', registeredDate: '2024-01-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', registeredDate: '2024-02-05' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'admin', registeredDate: '2024-02-10' }
  ]);

  // All Books State (from all librarians)
  const [books, setBooks] = useState([
    { id: 1, name: 'The Great Gatsby', image: 'https://via.placeholder.com/100', author: 'F. Scott Fitzgerald', librarian: 'Jane Smith', status: 'published', price: 29.99 },
    { id: 2, name: 'To Kill a Mockingbird', image: 'https://via.placeholder.com/100', author: 'Harper Lee', librarian: 'Jane Smith', status: 'published', price: 24.99 },
    { id: 3, name: '1984', image: 'https://via.placeholder.com/100', author: 'George Orwell', librarian: 'Jane Smith', status: 'unpublished', price: 19.99 },
    { id: 4, name: 'Pride and Prejudice', image: 'https://via.placeholder.com/100', author: 'Jane Austen', librarian: 'Jane Smith', status: 'published', price: 22.50 }
  ]);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage('');

    try {
      await updateProfile(user, {
        displayName: profileForm.displayName,
        photoURL: profileForm.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`
      });
      setProfileMessage('Profile updated successfully!');
      setIsEditingProfile(false);
    } catch (error) {
      setProfileMessage('Error updating profile: ' + error.message);
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle user role change
  const handleMakeLibrarian = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: 'librarian' } : u
    ));
  };

  const handleMakeAdmin = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: 'admin' } : u
    ));
  };

  // Handle book status change
  const handleToggleBookStatus = (bookId) => {
    setBooks(books.map(book => 
      book.id === bookId 
        ? { ...book, status: book.status === 'published' ? 'unpublished' : 'published' } 
        : book
    ));
  };

  // Handle delete book
  const handleDeleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book? This will also delete all orders for this book.')) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage users, books, and system settings</p>
      </div>

      {/* My Profile Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">👤 My Profile</h2>
          
          {!isEditingProfile ? (
            <div className="flex items-center gap-6">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} alt="Profile" />
                </div>
              </div>
              <div className="space-y-2">
                <p><strong>Name:</strong> {user?.displayName || 'Not set'}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> <span className="badge badge-error">Admin</span></p>
                <button 
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => setIsEditingProfile(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="flex items-start gap-6">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img 
                      src={profileForm.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} 
                      alt="Profile Preview" 
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="input input-bordered"
                      value={profileForm.displayName}
                      onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Photo URL</span>
                    </label>
                    <input
                      type="url"
                      placeholder="Enter photo URL (optional)"
                      className="input input-bordered"
                      value={profileForm.photoURL}
                      onChange={(e) => setProfileForm({ ...profileForm, photoURL: e.target.value })}
                    />
                  </div>
                  {profileMessage && (
                    <div className={`alert ${profileMessage.includes('Error') ? 'alert-error' : 'alert-success'}`}>
                      <span>{profileMessage}</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={profileLoading}
                    >
                      {profileLoading ? 'Updating...' : 'Save Changes'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-ghost"
                      onClick={() => {
                        setIsEditingProfile(false);
                        setProfileForm({
                          displayName: user?.displayName || '',
                          photoURL: user?.photoURL || ''
                        });
                        setProfileMessage('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* All Users Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">👥 All Users</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Registered Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="hover">
                    <td className="font-mono">#{u.id}</td>
                    <td className="font-semibold">{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${
                        u.role === 'admin' ? 'badge-error' :
                        u.role === 'librarian' ? 'badge-info' :
                        'badge-success'
                      }`}>
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </span>
                    </td>
                    <td>{new Date(u.registeredDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</td>
                    <td>
                      <div className="flex gap-2">
                        {u.role !== 'librarian' && u.role !== 'admin' && (
                          <button 
                            className="btn btn-info btn-sm"
                            onClick={() => handleMakeLibrarian(u.id)}
                          >
                            Make Librarian
                          </button>
                        )}
                        {u.role !== 'admin' && (
                          <button 
                            className="btn btn-error btn-sm"
                            onClick={() => handleMakeAdmin(u.id)}
                          >
                            Make Admin
                          </button>
                        )}
                        {u.role === 'admin' && (
                          <span className="text-sm text-gray-500">Current Admin</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Manage Books Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">📚 Manage All Books</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Librarian</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map(book => (
                  <tr key={book.id} className="hover">
                    <td>
                      <div className="avatar">
                        <div className="w-16 rounded">
                          <img src={book.image} alt={book.name} />
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold">{book.name}</td>
                    <td>{book.author}</td>
                    <td className="text-sm text-gray-600">{book.librarian}</td>
                    <td className="font-bold text-primary">${Number(book.price).toFixed(2)}</td>
                    <td>
                      <span className={`badge ${book.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                        {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          className={`btn btn-sm ${book.status === 'published' ? 'btn-warning' : 'btn-success'}`}
                          onClick={() => handleToggleBookStatus(book.id)}
                        >
                          {book.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button 
                          className="btn btn-error btn-sm"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
