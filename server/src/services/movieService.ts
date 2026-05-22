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

    async getFavorites() {
        return this.favoriteRepository.getFavorites();
    }

    async removeFavorites(id: string) {
        return this.favoriteRepository.removeFavorite(id);
    }

    async addFavorites(movie: Movie) {
        return this.favoriteRepository.addFavorite(movie);
    }
}