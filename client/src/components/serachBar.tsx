import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMovieContext } from '../context/useMovieContext';

export function Search() {
  const [query, setQuery] = useState('');
  const { setSearchQuery, setPage } = useMovieContext();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query.trim());
      setPage(1);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex gap-3 max-w-2xl mx-auto w-full">
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
      <button
        type="submit"
        className="bg-[#D4AF37] text-black font-semibold px-6 py-3 rounded-xl hover:bg-amber-400 active:scale-95 transition-all duration-200 shadow-lg shadow-amber-950/20"
      >
        Search
      </button>
    </form>
  );
}
