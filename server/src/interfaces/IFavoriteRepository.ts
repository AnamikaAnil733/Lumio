import { Movie } from "./movieInterface.js";

export interface IFavoriteRepository {
    getFavorites(sessionId: string): Promise<Movie[]>;
    addFavorite(movie: Movie, sessionId: string): Promise<Movie[]>;
    removeFavorite(id: string, sessionId: string): Promise<Movie[]>;
}
