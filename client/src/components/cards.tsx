import { FaFilm, FaHeart, FaRegHeart, FaSpinner } from 'react-icons/fa';
import { useMovieContext } from '../context/useMovieContext';
import type { Movie } from '../Type/movieType';

function MovieCard({ movie, isFav }: { movie: Movie; isFav: boolean }) {
  const { toggleFavorite } = useMovieContext();

  return (
    <div className="group bg-[#121212] border border-gray-800/80 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 hover:shadow-lg hover:shadow-amber-950/5 hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
      {/* Poster */}
      <div className="aspect-2/3 w-full bg-[#1E1E1E] overflow-hidden relative">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-2">
            <FaFilm className="text-4xl" />
            <span className="text-xs">No Poster</span>
          </div>
        )}
        {/* Favorite Toggle Overlay */}
        <button
          onClick={() => toggleFavorite(movie)}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-2.5 rounded-full text-gray-300 transition-all duration-200"
        >
          {isFav ? (
            <FaHeart className="text-red-500 text-lg transition-transform active:scale-125" />
          ) : (
            <FaRegHeart className="hover:text-red-400 text-lg transition-transform active:scale-125" />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-1">
        <h3 className="font-bold text-sm text-gray-200 line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition duration-200">
          {movie.Title}
        </h3>
        <span className="text-xs text-gray-500 font-medium">{movie.Year}</span>
      </div>
    </div>
  );
}

export function Cards() {
  const { activeTab, movies, favorites, loading, error } = useMovieContext();

  if (activeTab === 'favorites') {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-400">
          Saved Favorites
        </h2>

        {favorites.length === 0 ? (
          <div className="text-center py-24 text-gray-500 flex flex-col items-center gap-3 bg-[#121212] rounded-3xl border border-gray-950 p-8">
            <FaRegHeart className="text-6xl text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-400">No Favorites Added</h3>
            <p className="max-w-md text-sm text-gray-500">
              Your favorites list is empty. Go back to search and click the heart icon on any movie to save it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <MovieCard key={movie.Id} movie={movie} isFav={true} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Search tab
  return (
    <>
      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <FaSpinner className="animate-spin text-4xl text-[#D4AF37]" />
          <span className="text-gray-400 font-medium">Searching the database...</span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-16 text-gray-400 flex flex-col items-center gap-2">
          <p className="text-lg font-medium text-amber-500/80">{error}</p>
          <p className="text-sm text-gray-500">Double check spelling or try a different term.</p>
        </div>
      )}

      {/* Results Grid */}
      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => {
            const isFav = favorites.some((f) => f.Id === movie.Id);
            return <MovieCard key={movie.Id} movie={movie} isFav={isFav} />;
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && movies.length === 0 && (
        <div className="text-center py-24 text-gray-500 flex flex-col items-center gap-3">
          <FaFilm className="text-6xl text-gray-700 animate-pulse" />
          <h3 className="text-xl font-semibold text-gray-400">Discover Movies</h3>
          <p className="max-w-md text-sm">
            Type a title in the search bar above to fetch and browse film records from OMDb.
          </p>
        </div>
      )}
    </>
  );
}
