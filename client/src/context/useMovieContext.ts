import { useContext } from "react";
import { MovieContext } from "./movieContextDef";

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used inside a MovieProvider");
  }
  return context;
};
