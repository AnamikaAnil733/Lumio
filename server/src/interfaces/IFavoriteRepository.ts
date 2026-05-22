import { Movie } from "./movieInterface.js";

export interface IFavoriteRepository {
    getFavorites(): Promise<Movie[]>;
    addFavorite(movie: Movie): Promise<Movie[]>;
    removeFavorite(id: string): Promise<Movie[]>;
}
