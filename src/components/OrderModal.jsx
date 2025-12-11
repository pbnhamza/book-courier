import { useState } from 'react';

const OrderModal = ({ book, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission
    console.log('Order submitted:', { book, ...formData });
    onClose();
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      notes: ''
    });
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open ">
      <div className="modal-box max-w-2xl p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-bold text-2xl text-gray-800">Place Your Order</h3>
            <p className="text-sm text-gray-500 mt-1">Complete the form below to order this book</p>
          </div>
          <button 
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Book Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-100">
          <div className="flex items-center gap-4">
            {book?.image && (
              <img 
                src={book.image} 
                alt={book.title}
                className="w-16 h-20 object-cover rounded shadow-md"
              />
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-800">{book?.title}</h4>
              {book?.author && (
                <p className="text-sm text-gray-600">by {book.author}</p>
              )}
              {book?.price && (
                <p className="text-lg font-bold text-indigo-600 mt-1">${book.price}</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name <span className='text-red-500'>*</span></span>
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  className="input input-bordered w-full focus:input-primary border-2 border-gray-400 rounded px-2" 
                  required 
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email
                    <span className='text-red-500'>*</span>
                  </span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  className="input input-bordered w-full focus:input-primary border-2 border-gray-400 rounded px-2" 
                  required 
                />
              </div>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-medium">Phone Number <span className='text-red-500'>*</span></span>
              </label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+880 1717000000" 
                className="input input-bordered w-full focus:input-primary  border-2 border-gray-400 rounded px-2" 
                required 
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Delivery Address
            </h4>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Street Address <span className='text-red-500'>*</span></span>
                <span className="label-text font-medium">Street Address </span>
              </label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your Street Address" 
                className="input input-bordered w-full focus:input-primary border-2 border-gray-400 rounded px-2" 
                required 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label className="label">
                <span className="label-text font-medium">Street Address <span className='text-red-500'>*</span></span>
                  <span className="label-text font-medium">City </span>
                </label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your City" 
                  className="input input-bordered w-full focus:input-primary border-2 border-gray-400 rounded px-2" 
                  required 
                />
              </div>
              <div className="form-control">
                <label className="label">
                <span className="label-text font-medium">Street Address <span className='text-red-500'>*</span></span>
                  <span className="label-text font-medium">Postal Code </span>
                </label>
                <input 
                  type="text" 
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Your Postal Code" 
                  className="input input-bordered w-full focus:input-primary border-2 border-gray-400 rounded px-2" 
                  required 
                />
              </div>
            </div>
          </div>

          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button 
              type="submit" 
              className="btn px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 rounded-2xl flex-1 gap-2"
            >
              
              Confirm Order
            </button>
            <button 
              type="button" 
              className="btn px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-500 hover:from-gray-700 hover:to-gray-600-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 rounded-2xl flex-1 gap-2" 
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      
      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default OrderModal;
