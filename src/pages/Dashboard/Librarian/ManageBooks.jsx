const ManageBooks = () => {
  const books = [
    { id: 1, title: 'Sample Book 1', author: 'Author 1', stock: 10 },
    { id: 2, title: 'Sample Book 2', author: 'Author 2', stock: 5 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Books</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.stock}</td>
                <td>
                  <button className="btn btn-sm btn-primary mr-2">Edit</button>
                  <button className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
