import axios from "axios";
import { IMovieRepository } from "../interfaces/IMovieRepository.js";

export class OmdbMovieRepository implements IMovieRepository {
    async searchMovies(query: string, page: string = "1"): Promise<any> {
        const API_KEY = process.env.OMDB_API_KEY;
        const response = await axios.get(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`
        );

        if (response.data && response.data.Response === "True" && Array.isArray(response.data.Search)) {
            const mappedSearch = response.data.Search.map((m: any) => ({
                Id: m.imdbID,
                Title: m.Title,
                Year: m.Year,
                Poster: m.Poster,
            }));
            return {
                ...response.data,
                Search: mappedSearch,
            };
        }

        return response.data;
    }
}
