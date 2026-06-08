import axios from "axios";
import type { Movie } from "../Type/movieType.ts";
import { getSessionId } from "../utils/session";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export const searchMovies = async (query: string, page: number) => {
    const response = await API.get("/api/movies/search", {
        params: { q: query, page }
    });
    return response.data;
};

export const getFavorites = async (): Promise<Movie[]> => {
    const response = await API.get("/api/movies/favorites", {
        headers: { "X-Session-Id": getSessionId() }
    });
    return response.data;
};

export const removeFavorite = async (id: string): Promise<Movie[]> => {
    const response = await API.delete(`/api/movies/favorites/${id}`, {
        headers: { "X-Session-Id": getSessionId() }
    });
    return response.data;
};

export const addFavorite = async (movie: Movie): Promise<Movie[]> => {
    const response = await API.post("/api/movies/favorites", movie, {
        headers: { "X-Session-Id": getSessionId() }
    });
    return response.data;
};

export default API;