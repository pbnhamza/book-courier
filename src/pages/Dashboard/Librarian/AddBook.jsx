import { useState } from 'react';
import { useNavigate } from 'react-router';

import { toast } from 'react-toastify';

const AddBook = () => {
  const navigate = useNavigate();
  const [bookForm, setBookForm] = useState({
    name: '',
    image: '',
    author: '',
    category: '',
    price: '',
    status: 'published',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...bookForm,
        price: parseFloat(bookForm.price)
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Book added successfully!");
        console.log(data);
        setBookForm({
          title: '',
          coverImage: '',
          author: '',
          category: '',
          price: '',
          status: 'published',
          description: ''
        });
        navigate("/books");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add book");
      });
  };

  return (
   
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <h2 className="card-title text-2xl mb-4">📚 Add New Book</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Book Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter book name"
                  className="input input-bordered border-2 border-gray-400 px-2 rounded ml-15"
                  value={bookForm.title}
                  onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Author</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  className="input input-bordered border-2 border-gray-400 px-2 rounded ml-10"
                  value={bookForm.author}
                  onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Book Image URL </span>
                </label>
                <input
                  type="url"
                  placeholder="Enter image URL"
                  className="input input-bordered border-2 border-gray-400 px-2 rounded ml-7"
                  value={bookForm.coverImage}
                  onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold ">Category</span>
                </label>
                <input
                  type="text"
                  placeholder="Category"
                  className="input input-bordered border-2 border-gray-400 px-2 rounded ml-7"
                  value={bookForm.category}
                  onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Price ($) </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter price"
                  className="input input-bordered border-2 border-gray-400 px-2 rounded ml-20"
                  value={bookForm.price}
                  onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Status</span>
                </label>
                <select
                  className="select select-bordered border-2 border-gray-400 px-2 rounded ml-12"
                  value={bookForm.status}
                  onChange={(e) => setBookForm({ ...bookForm, status: e.target.value })}
                  required
                >
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                placeholder="Enter book description"
                className="textarea textarea-bordered h-24 border-2 border-gray-400 px-2 rounded ml-14"
                value={bookForm.description}
                onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="btn w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 rounded-2xl ">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Book
            </button>
          </form>
        </div>
      </div>
  );
};

export default AddBook;
