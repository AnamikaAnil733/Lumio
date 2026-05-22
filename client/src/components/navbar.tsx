import { FaFilm } from 'react-icons/fa';
import { useMovieContext } from '../context/movieContext';

export function Navbar() {
  const { activeTab, setActiveTab, favorites } = useMovieContext();

  return (
    <header className="sticky top-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FaFilm className="text-[#D4AF37] text-3xl" />
        <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-400">
          LUMIO
        </h1>
      </div>

      {/* Tab Controls */}
      <div className="flex bg-[#1E1E1E] p-1 rounded-lg border border-gray-800">
        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
            activeTab === 'search'
              ? 'bg-[#D4AF37] text-black shadow-md'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Search Movies
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
            activeTab === 'favorites'
              ? 'bg-[#D4AF37] text-black shadow-md'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          My Favorites ({favorites.length})
        </button>
      </div>
    </header>
  );
}
