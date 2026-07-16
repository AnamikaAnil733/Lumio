import { Movie } from "../interfaces/IMovieInterface.js";
import { IFavoriteRepository } from "../interfaces/IFavoriteRepository.js";
import { readFavorites, writeFavorites } from "../utils/fileHandler.js";

export class JsonFavoriteRepository implements IFavoriteRepository {
    async getFavorites(sessionId: string): Promise<Movie[]> {
        return readFavorites(sessionId);
    }

    async addFavorite(movie: Movie, sessionId: string): Promise<Movie[]> {
        const favorites = await readFavorites(sessionId);
        const exists = favorites.find(
            (f: Movie) => f.Id === movie.Id
        );
        if (exists) {
            return favorites;
        }
        favorites.push(movie);
        await writeFavorites(sessionId, favorites);
        return favorites;
    }

    async removeFavorite(id: string, sessionId: string): Promise<Movie[]> {
        const favorites = await readFavorites(sessionId);
        const updatedFavorites = favorites.filter(
            (movie: Movie) => movie.Id !== id
        );
        await writeFavorites(sessionId, updatedFavorites);
        return updatedFavorites;
    }
}
