import { createContext, useContext, useState, useEffect } from "react";
import type { Movie } from "../Type/movieType";
import { searchMovies, getFavorites, addFavorite, removeFavorite } from "../services/movieApi";

type MovieContextType = {
  activeTab: "search" | "favorites";
  setActiveTab: React.Dispatch<React.SetStateAction<"search" | "favorites">>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  movies: Movie[];
  favorites: Movie[];
  loading: boolean;
  totalResults: number;
  error: string | null;
  toggleFavorite: (movie: Movie) => Promise<void>;
};

export const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<"search" | "favorites">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favs = await getFavorites();
        setFavorites(favs);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies(searchQuery, page);
        if (data.Response === "True") {
          setMovies(data.Search || []);
          setTotalResults(parseInt(data.totalResults) || 0);
        } else {
          setMovies([]);
          setTotalResults(0);
          setError(data.Error || "No movies found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, page]);

  const toggleFavorite = async (movie: Movie) => {
    const isFav = favorites.some((f) => f.Id === movie.Id);
    try {
      if (isFav) {
        const updated = await removeFavorite(movie.Id);
        setFavorites(updated);
      } else {
        const updated = await addFavorite(movie);
        setFavorites(updated);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        movies,
        favorites,
        loading,
        totalResults,
        error,
        toggleFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used inside a MovieProvider");
  }
  return context;
};
