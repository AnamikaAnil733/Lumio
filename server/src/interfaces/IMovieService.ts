import { Movie } from "./movieInterface.js";

export interface IMovieService {
    searchMovies(query: string, page?: string): Promise<any>;
    getFavorites(sessionId: string): Promise<Movie[]>;
    removeFavorites(id: string, sessionId: string): Promise<Movie[]>;
    addFavorites(movie: Movie, sessionId: string): Promise<Movie[]>;
}
