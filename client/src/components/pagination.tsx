import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useMovieContext } from '../context/useMovieContext';

export function Pagination() {
  const { page, setPage, totalResults, loading, movies, activeTab } = useMovieContext();

  const totalPages = Math.ceil(totalResults / 10);

  if (activeTab !== 'search' || loading || movies.length === 0 || totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-900">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="p-3 bg-[#121212] border border-gray-800 rounded-xl hover:border-gray-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition duration-200 text-gray-300"
      >
        <FaChevronLeft />
      </button>
      <span className="text-sm text-gray-400 font-medium">
        Page <span className="text-gray-200">{page}</span> of{' '}
        <span className="text-gray-200">{totalPages}</span>
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        className="p-3 bg-[#121212] border border-gray-800 rounded-xl hover:border-gray-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition duration-200 text-gray-300"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
