const Reports = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value">1,234</div>
        </div>
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Total Users</div>
          <div className="stat-value">567</div>
        </div>
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Total Books</div>
          <div className="stat-value">890</div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
