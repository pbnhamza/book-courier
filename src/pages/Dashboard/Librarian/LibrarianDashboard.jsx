import { useState } from 'react';

const LibrarianDashboard = () => {
 
 

  // My Books State
  const [books, setBooks] = useState([
    { id: 1, name: 'The Great Gatsby', image: 'https://via.placeholder.com/100', author: 'F. Scott Fitzgerald', status: 'published', price: 29.99 },
    { id: 2, name: 'To Kill a Mockingbird', image: 'https://via.placeholder.com/100', author: 'Harper Lee', status: 'published', price: 24.99 },
    { id: 3, name: '1984', image: 'https://via.placeholder.com/100', author: 'George Orwell', status: 'unpublished', price: 19.99 }
  ]);
  const [editingBook, setEditingBook] = useState(null);

  // Orders State
  const [orders, setOrders] = useState([
    { id: 1, bookName: 'The Great Gatsby', customerName: 'John Doe', orderDate: '2024-02-15', status: 'pending', amount: 29.99 },
    { id: 2, bookName: 'To Kill a Mockingbird', customerName: 'Jane Smith', orderDate: '2024-02-18', status: 'shipped', amount: 24.99 },
    { id: 3, bookName: '1984', customerName: 'Bob Johnson', orderDate: '2024-02-20', status: 'delivered', amount: 19.99 }
  ]);

  // Handle Add Book
  
  // Handle Edit Book
  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = (e) => {
    e.preventDefault();
    setBooks(books.map(book => 
      book.id === editingBook.id ? editingBook : book
    ));
    setEditingBook(null);
  };

  // Handle Order Status Change
  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Handle Cancel Order
  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Librarian Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your books and orders</p>
      </div>

      

      {/* My Books Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">📖 My Books</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Book Name</th>
                  <th>Author</th>
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
                    <td className="font-bold text-primary">${Number(book.price).toFixed(2)}</td>
                    <td>
                      <span className={`badge ${book.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                        {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditBook(book)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Book Modal */}
      {editingBook && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Edit Book</h3>
            <form onSubmit={handleUpdateBook} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Book Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={editingBook.name}
                    onChange={(e) => setEditingBook({ ...editingBook, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Author</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={editingBook.author}
                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Price ($)</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="input input-bordered"
                    value={editingBook.price}
                    onChange={(e) => setEditingBook({ ...editingBook, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Status</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={editingBook.status}
                    onChange={(e) => setEditingBook({ ...editingBook, status: e.target.value })}
                  >
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                  </select>
                </div>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn" onClick={() => setEditingBook(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Orders Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">📦 Orders</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Book Name</th>
                  <th>Customer</th>
                  <th>Order Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="hover">
                    <td className="font-mono">#{order.id}</td>
                    <td className="font-semibold">{order.bookName}</td>
                    <td>{order.customerName}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</td>
                    <td className="font-bold text-primary">${Number(order.amount).toFixed(2)}</td>
                    <td>
                      <span className={`badge ${
                        order.status === 'delivered' ? 'badge-success' :
                        order.status === 'shipped' ? 'badge-info' :
                        order.status === 'pending' ? 'badge-warning' :
                        'badge-error'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {order.status !== 'cancelled' && order.status !== 'delivered' && (
                          <select
                            className="select select-bordered select-sm"
                            value={order.status}
                            onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        )}
                        {order.status !== 'cancelled' && order.status !== 'delivered' && (
                          <button 
                            className="btn btn-error btn-sm"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            Cancel
                          </button>
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
    </div>
  );
};

export default LibrarianDashboard;
