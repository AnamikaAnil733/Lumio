import { OmdbMovieRepository } from "../repositories/omdbMovieRepository.js";
import { JsonFavoriteRepository } from "../repositories/FavoriteRepository.js";
import { MovieService } from "../services/movieService.js";
import { MovieController } from "../controllers/movieController.js";

const movieRepository = new OmdbMovieRepository();
const favoriteRepository = new JsonFavoriteRepository();
const movieService = new MovieService(movieRepository, favoriteRepository);
export const movieController = new MovieController(movieService);
