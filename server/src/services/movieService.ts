import { Movie } from "../interfaces/movieInterface.js";
import { IMovieRepository } from "../interfaces/IMovieRepository.js";
import { IFavoriteRepository } from "../interfaces/IFavoriteRepository.js";
import { IMovieService } from "../interfaces/IMovieService.js";

export class MovieService implements IMovieService {
    constructor(
        private movieRepository: IMovieRepository,
        private favoriteRepository: IFavoriteRepository
    ) {}

    async searchMovies(query: string, page: string = "1") {
        return this.movieRepository.searchMovies(query, page);
    }

    async getFavorites(sessionId: string) {
        return this.favoriteRepository.getFavorites(sessionId);
    }

    async removeFavorites(id: string, sessionId: string) {
        return this.favoriteRepository.removeFavorite(id, sessionId);
    }

    async addFavorites(movie: Movie, sessionId: string) {
        return this.favoriteRepository.addFavorite(movie, sessionId);
    }
}