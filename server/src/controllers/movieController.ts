import { Request, Response, NextFunction } from "express";
import { IMovieService } from "../interfaces/IMovieService.js";

export class MovieController {
    constructor(private movieService: IMovieService) {}

    searchMovies = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query.q as string;
            const page = req.query.page as string;
            if (!query) {
                return res.status(400).json({
                    message: "search query required"
                });
            }

            const movies = await this.movieService.searchMovies(query, page);
            return res.status(200).json(movies);
        } catch (error) {
            next(error);
        }
    };

    getFavorites = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const favorites = await this.movieService.getFavorites();
            return res.status(200).json(favorites);
        } catch (error) {
            next(error);
        }
    };

    addFavorites = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const movie = req.body;
            const favorites = await this.movieService.addFavorites(movie);
            return res.status(200).json(favorites);
        } catch (error) {
            next(error);
        }
    };

    removeFavorites = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            const favorites = await this.movieService.removeFavorites(id);
            return res.status(200).json(favorites);
        } catch (error) {
            next(error);
        }
    };
}