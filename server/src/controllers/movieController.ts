import { Request, Response } from "express";
import { IMovieService } from "../interfaces/IMovieService.js";
import { HttpStatusCode } from "../constants/statuscode/statuscode.js";
import { CustomError } from "../utils/customError.js";
import { MESSAGES } from "../constants/messages/messages.js";
import { CustomRequest } from "../interfaces/ICustomRequest.js";

export class MovieController {
    constructor(private _movieService: IMovieService) {}

    searchMovies = async (req: Request, res: Response) => {
            const query = req.query.q as string;
            const page = req.query.page as string;
            if (!query) {
                throw new CustomError(
                    HttpStatusCode.BAD_REQUEST,
                    MESSAGES.SEARCH_QUERY_REQUIRED
                );
            }
            const movies = await this._movieService.searchMovies(query, page);
            return res.status(HttpStatusCode.OK).json(movies);
    };

    getFavorites = async (req: CustomRequest, res: Response) => {
            const favorites = await this._movieService.getFavorites(req.sessionId!);
            return res.status(HttpStatusCode.OK).json(favorites);
    };

    addFavorites = async (req: CustomRequest, res: Response) => {
            const movie = req.body;
            const favorites = await this._movieService.addFavorites(movie, req.sessionId!);
            return res.status(HttpStatusCode.OK).json(favorites);
    };

    removeFavorites = async (req: CustomRequest, res: Response) => {
            const id = req.params.id as string;
            const favorites = await this._movieService.removeFavorites(id, req.sessionId!);
            return res.status(HttpStatusCode.OK).json(favorites);
    };
}