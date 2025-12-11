import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const queryClient = useQueryClient();

  // Fetch all books
  const { isPending, error, data: books = [] } = useQuery({
    queryKey: ['admin-books'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books/all`);
      return result.data;
    }
  });

  // Toggle publish/unpublish mutation
  const togglePublishMutation = useMutation({
    mutationFn: async ({ bookId, isPublished }) => {
      const result = await axios.patch(
        `${import.meta.env.VITE_API_URL}/books/${bookId}/publish`,
        { isPublished: !isPublished }
      );
      return result.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['admin-books']);
      toast.success(variables.isPublished ? 'Book unpublished successfully!' : 'Book published successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update book status');
    }
  });

  // Delete book mutation
  const deleteBookMutation = useMutation({
    mutationFn: async (bookId) => {
      const result = await axios.delete(`${import.meta.env.VITE_API_URL}/books/${bookId}`);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-books']);
      toast.success('Book and all related orders deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete book');
    }
  });

  // Handle publish/unpublish
  const handleTogglePublish = (book) => {
    const action = book.isPublished ? 'unpublish' : 'publish';
    if (window.confirm(`Are you sure you want to ${action} "${book.title}"?`)) {
      togglePublishMutation.mutate({ bookId: book.id, isPublished: book.isPublished });
    }
  };

  // Handle delete
  const handleDelete = (book) => {
    if (window.confirm(`⚠️ WARNING: This will permanently delete "${book.title}" and ALL related orders. This action cannot be undone. Are you sure?`)) {
      deleteBookMutation.mutate(book.id);
    }
  };

  // Get unique categories
  const categories = books.length > 0 
    ? [...new Set(books.map(book => book.category).filter(Boolean))]
    : [];

  // Filter books
  const filteredBooks = books.filter(book => {
    const matchesSearch = searchTerm === '' || 
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.addedBy?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'published' && book.isPublished) ||
      (filterStatus === 'unpublished' && !book.isPublished);
    
    const matchesCategory = filterCategory === 'all' || book.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading books: {error.message}</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Manage Books</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage all books added by librarians</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Total Books</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{books.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Published</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {books.filter(b => b.isPublished).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Unpublished</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {books.filter(b => !b.isPublished).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Categories</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{categories.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Search Books
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, author, or librarian..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Filter by Status
            </label>
            <select
              className="select select-bordered w-full"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Filter by Category
            </label>
            <select
              className="select select-bordered w-full"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Book Cover */}
              <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`badge ${book.isPublished ? 'badge-success' : 'badge-warning'} font-bold`}>
                    {book.isPublished ? 'Published' : 'Unpublished'}
                  </span>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  by {book.author}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-sm badge-outline">{book.category}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <p>Added by: <span className="font-semibold">{book.addedBy || 'Unknown'}</span></p>
                  <p>Date: {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleTogglePublish(book)}
                    disabled={togglePublishMutation.isPending}
                    className={`btn btn-sm w-full ${
                      book.isPublished 
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white border-none' 
                        : 'bg-green-600 hover:bg-green-700 text-white border-none'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {book.isPublished ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                    {book.isPublished ? 'Unpublish' : 'Publish'}
                  </button>

                  <button
                    onClick={() => handleDelete(book)}
                    disabled={deleteBookMutation.isPending}
                    className="btn btn-sm btn-error w-full"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Book
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <svg className="w-24 h-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">No books found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Results Summary */}
      {filteredBooks.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredBooks.length} of {books.length} books
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
