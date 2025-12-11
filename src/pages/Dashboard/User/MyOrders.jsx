const MyOrders = () => {
  const orders = [
    { id: 1, bookTitle: 'Sample Book 1', status: 'Delivered', date: '2024-01-15' },
    { id: 2, bookTitle: 'Sample Book 2', status: 'In Transit', date: '2024-01-20' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Book Title</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.bookTitle}</td>
                <td><span className="badge badge-success">{order.status}</span></td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
