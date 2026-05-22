import { Movie } from "../interfaces/movieInterface.js";
import { IFavoriteRepository } from "../interfaces/IFavoriteRepository.js";
import { readFavorites, writeFavorites } from "../utils/fileHandler.js";

export class JsonFavoriteRepository implements IFavoriteRepository {
    async getFavorites(): Promise<Movie[]> {
        return readFavorites();
    }

    async addFavorite(movie: Movie): Promise<Movie[]> {
        const favorites = await readFavorites();
        const exists = favorites.find(
            (f: Movie) => f.Id === movie.Id
        );
        if (exists) {
            return favorites;
        }
        favorites.push(movie);
        await writeFavorites(favorites);
        return favorites;
    }

    async removeFavorite(id: string): Promise<Movie[]> {
        const favorites = await readFavorites();
        const updatedFavorites = favorites.filter(
            (movie: Movie) => movie.Id !== id
        );
        await writeFavorites(updatedFavorites);
        return updatedFavorites;
    }
}
