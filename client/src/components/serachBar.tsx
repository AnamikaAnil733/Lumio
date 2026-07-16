import { useState,useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMovieContext } from '../context/useMovieContext';
import  useDebounce   from "../hooks/useDebounce"

export function Search() {
  const [query, setQuery] = useState('');
  const { setSearchQuery, setPage } = useMovieContext();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
    setPage(1);
  }, [debouncedQuery, setPage, setSearchQuery]);

  return (
   
      <div className="relative flex-1">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#161616] border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition duration-300"
        />
      </div>

  );
}
