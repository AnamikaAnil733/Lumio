import { useState, useEffect, useCallback } from "react";
import type { Movie } from "../Type/movieType";
import { searchMovies, getFavorites, addFavorite, removeFavorite } from "../services/movieApi";
import { MovieContext } from "./movieContextDef";

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<"search" | "favorites">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const favs = await getFavorites();
        setFavorites(favs);

        const data = await searchMovies("avengers", 1);
        if (data.Response === "True") {
          setMovies(data.Search || []);
          setTotalResults(parseInt(data.totalResults) || 0);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    };
    initData();
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

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query) {
      setMovies([]);
      setTotalResults(0);
      setError(null);
    }
  }, []);

  return (
    <MovieContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery: updateSearchQuery,
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
}
