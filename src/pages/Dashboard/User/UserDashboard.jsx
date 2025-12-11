import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { updateProfile } from 'firebase/auth';

const UserDashboard = () => {
  const { user } = useAuth();

  // Profile form state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  // Orders data with payment status
  const [orders, setOrders] = useState([
    { id: 1, bookTitle: 'The Great Gatsby', paymentStatus: 'paid', orderDate: '2024-01-15' },
    { id: 2, bookTitle: 'To Kill a Mockingbird', paymentStatus: 'pending', orderDate: '2024-01-20' },
    { id: 3, bookTitle: '1984', paymentStatus: 'pending', orderDate: '2024-02-05' },
    { id: 4, bookTitle: 'Pride and Prejudice', paymentStatus: 'paid', orderDate: '2024-02-10' },
    { id: 5, bookTitle: 'The Catcher in the Rye', paymentStatus: 'cancelled', orderDate: '2024-02-12' }
  ]);

  // Invoices data (only for paid orders)
  const invoices = [
    {
      id: 1,
      paymentId: 'PAY-2024-001-ABC123',
      bookName: 'The Great Gatsby',
      amount: 29.99,
      date: '2024-01-15'
    },
    {
      id: 2,
      paymentId: 'PAY-2024-004-JKL012',
      bookName: 'Pride and Prejudice',
      amount: 22.50,
      date: '2024-02-10'
    }
  ];

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);

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

  // Handle cancel order
  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, paymentStatus: 'cancelled' } : order
    ));
  };

  // Handle pay now (simulate payment)
  const handlePayNow = (orderId) => {
    // In real app, this would redirect to payment gateway
    alert(`Redirecting to payment page for Order #${orderId}`);
    // Simulate successful payment
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, paymentStatus: 'paid' } : order
    ));
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold mb-2">User Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.displayName || user?.email || 'User'}! 👋</p>
      </div>

      {/* Profile Section */}
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
                <p><strong>Role:</strong> <span className="badge badge-primary">{user?.role || 'User'}</span></p>
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

      {/* My Orders Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">📦 My Orders</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Book Title</th>
                  <th>Order Date</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="hover">
                    <td className="font-mono">#{order.id}</td>
                    <td className="font-semibold">{order.bookTitle}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</td>
                    <td>
                      <span className={`badge ${
                        order.paymentStatus === 'paid' ? 'badge-success' :
                        order.paymentStatus === 'pending' ? 'badge-warning' :
                        'badge-error'
                      }`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {order.paymentStatus === 'pending' && (
                          <>
                            <button 
                              className="btn btn-primary btn-sm"
                              onClick={() => handlePayNow(order.id)}
                            >
                              Pay Now
                            </button>
                            <button 
                              className="btn btn-error btn-sm"
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {order.paymentStatus === 'paid' && (
                          <span className="text-success font-semibold">✓ Paid</span>
                        )}
                        {order.paymentStatus === 'cancelled' && (
                          <span className="text-error font-semibold">✗ Cancelled</span>
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

      {/* Invoices Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h2 className="card-title text-2xl">💳 Payment Invoices</h2>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total Paid</div>
                <div className="stat-value text-primary">${Number(totalAmount).toFixed(2)}</div>
                <div className="stat-desc">{invoices.length} payments</div>
              </div>
            </div>
          </div>
          
          {invoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Payment ID</th>
                    <th>Book Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id} className="hover">
                      <td>{index + 1}</td>
                      <td>
                        <span className="font-mono text-sm">{invoice.paymentId}</span>
                      </td>
                      <td>
                        <span className="font-semibold">{invoice.bookName}</span>
                      </td>
                      <td>
                        <span className="text-lg font-bold text-primary">
                          ${Number(invoice.amount).toFixed(2)}
                        </span>
                      </td>
                      <td>{new Date(invoice.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</td>
                      <td>
                        <button className="btn btn-sm btn-ghost">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xl text-gray-500">No payment invoices yet</p>
              <p className="text-sm text-gray-400 mt-2">Complete a payment to see your invoices here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
