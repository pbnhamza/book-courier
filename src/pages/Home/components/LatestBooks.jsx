import { Link } from 'react-router';
import BookCard from '../../../components/BookCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../../components/Loading';

const LatestBooks = () => {
  
   const { isPending, error, data } = useQuery({
    queryKey: ['books'],
    queryFn: async () =>
    await axios(`${import.meta.env.VITE_API_URL}/latest-book`)
        
  })


  if (isPending) return <Loading></Loading>

  if (error) return 'An error has occurred: ' + error.message
 

  return (
    <section className="container mx-auto px-4 py-5">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Latest <span className="text-primary">Additions</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover the newest books added by our librarians. Fresh titles arriving daily!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-5">
        {data.data.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* View All Books Button */}
      <div className="text-center mt-8">
        <Link 
          to="/books" 
          className="btn text-white btn-primary btn-lg gap-2 hover:scale-105 transition-transform px-2"
        >
          View All Books
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default LatestBooks;
