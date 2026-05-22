import { Movie } from "./movieInterface.js";

export interface IMovieService {
    searchMovies(query: string, page?: string): Promise<any>;
    getFavorites(): Promise<Movie[]>;
    removeFavorites(id: string): Promise<Movie[]>;
    addFavorites(movie: Movie): Promise<Movie[]>;
}
