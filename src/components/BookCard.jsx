import { Link } from 'react-router';

const BookCard = ({ book }) => {
  // Check if book is new (added within last 7 days)
  const isNew = book.addedDate && 
    new Date() - new Date(book.addedDate) < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="card bg-base-100 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1 group border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Book Cover Image */}
      <figure className="relative overflow-hidden h-[200px]">
        <img 
          src={book.coverImage || 'https://via.placeholder.com/300x400'} 
          alt={book.title} 
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* NEW Badge */}
        {isNew && (
          <div className="absolute top-4 right-4">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg animate-pulse">
              ✨ NEW
            </div>
          </div>
        )}
        
        {/* Price Badge */}
        {book.price && (
          <div className="absolute bottom-4 left-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl font-bold text-xl shadow-2xl backdrop-blur-sm">
              ${Number(book.price).toFixed(2)}
            </div>
          </div>
        )}

        
      </figure>

      {/* Card Body */}
      <div className="card-body p-3 bg-gradient-to-b from-base-100 to-base-200">
        {/* Category Badge */}
        <div className="">
          <span className="p-2 badge badge-primary badge-sm font-semibold">
            {book.category}
          </span>
        </div>

        {/* Book Title */}
        <h2 className="card-title text-xl font-bold line-clamp-2  group-hover:text-primary transition-colors">
          {book.title}
        </h2>
        
        {/* Author */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 ">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <span className="text-sm font-medium">{book.author}</span>
        </div>

        {/* Rating */}
        {book.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`} 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {Number(book.rating).toFixed(1)}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="divider"></div>

        {/* Action Buttons */}
        <div className="card-actions flex gap-2">
          <Link 
            to={`/books/${book._id}`} 
            className="btn text-white btn-primary flex-1 gap-2 group/btn"
          >
            <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Details
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default BookCard;
