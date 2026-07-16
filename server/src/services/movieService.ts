import { Movie } from "../interfaces/IMovieInterface.js";
import { IMovieRepository } from "../interfaces/IMovieRepository.js";
import { IFavoriteRepository } from "../interfaces/IFavoriteRepository.js";
import { IMovieService } from "../interfaces/IMovieService.js";

export class MovieService implements IMovieService {
    constructor(
        private _movieRepository: IMovieRepository,
        private _favoriteRepository: IFavoriteRepository
    ) {}

    async searchMovies(query: string, page: string = "1") {
        return this._movieRepository.searchMovies(query, page);
    }

    async getFavorites(sessionId: string) {
        return this._favoriteRepository.getFavorites(sessionId);
    }

    async removeFavorites(id: string, sessionId: string) {
        return this._favoriteRepository.removeFavorite(id, sessionId);
    }

    async addFavorites(movie: Movie, sessionId: string) {
        return this._favoriteRepository.addFavorite(movie, sessionId);
    }
}