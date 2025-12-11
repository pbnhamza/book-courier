import { useState } from 'react';
import BookCard from '../../components/BookCard';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';

const AllBooks = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const { isPending, error, data:books } = useQuery({
      queryKey: ['books'],
      queryFn: async () =>
      await axios(`${import.meta.env.VITE_API_URL}/book`)
      
          
    })
  
  // Get unique categories from data
  const categories = books?.data 
    ? [...new Set(books.data.map(book => book.category).filter(Boolean))]
    : [];

  // Filter books based on search term and category
  const filteredBooks = books?.data ? books.data.filter(book => {
    const matchesSearch = search === '' || 
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.author?.toLowerCase().includes(search.toLowerCase()) ||
      book.description?.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = category === 'all' || 
      book.category === category;
    
    return matchesSearch && matchesCategory;
  }) : [];
  
    if (isPending) return <Loading></Loading>
  
    if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Books</h1>
      
      <div className="flex gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Search books..." 
          className="input px-3 input-bordered grow border-2 border-gray-400 rounded-3xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="  dark:bg-gray-600 rounded px-2 bg-[#543FD9] text-white font-bold " value={category} onChange={(e) => setCategory(e.target.value)}>
          <option  value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => <BookCard key={book.id} book={book} />)
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No books found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
