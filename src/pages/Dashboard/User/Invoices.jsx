const Invoices = () => {
  const invoices = [
    {
      id: 1,
      paymentId: 'PAY-2024-001-ABC123',
      bookName: 'The Great Gatsby',
      amount: 29.99,
      date: '2024-01-15',
      status: 'Completed'
    },
    {
      id: 2,
      paymentId: 'PAY-2024-002-DEF456',
      bookName: 'To Kill a Mockingbird',
      amount: 24.99,
      date: '2024-01-20',
      status: 'Completed'
    },
    {
      id: 3,
      paymentId: 'PAY-2024-003-GHI789',
      bookName: '1984',
      amount: 19.99,
      date: '2024-02-05',
      status: 'Completed'
    },
    {
      id: 4,
      paymentId: 'PAY-2024-004-JKL012',
      bookName: 'Pride and Prejudice',
      amount: 22.50,
      date: '2024-02-12',
      status: 'Completed'
    },
    {
      id: 5,
      paymentId: 'PAY-2024-005-MNO345',
      bookName: 'The Catcher in the Rye',
      amount: 27.99,
      date: '2024-02-18',
      status: 'Pending'
    }
  ];

  const totalAmount = invoices
    .filter(inv => inv.status === 'Completed')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Payment Invoices</h1>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Paid</div>
            <div className="stat-value text-primary">${Number(totalAmount).toFixed(2)}</div>
            <div className="stat-desc">{invoices.filter(inv => inv.status === 'Completed').length} completed payments</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Payment ID</th>
              <th>Book Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
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
                  <span className={`badge ${
                    invoice.status === 'Completed' 
                      ? 'badge-success' 
                      : 'badge-warning'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
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

      {invoices.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-xl text-gray-500">No invoices found</p>
        </div>
      )}
    </div>
  );
};

export default Invoices;
