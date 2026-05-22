import { createContext } from "react";
import type { Movie } from "../Type/movieType";

export type MovieContextType = {
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
