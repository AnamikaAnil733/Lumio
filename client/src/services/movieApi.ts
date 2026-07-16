import axios from "axios";
import type { Movie } from "../Type/movieType.ts";
import { getSessionId } from "../utils/session";
import { route } from "../constants/routes/routes.ts";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "X-Session-Id": getSessionId(),
    }
});



export const searchMovies = async (query: string, page: number) => {
    const response = await API.get(route.SEARCHMOVIES, {
        params: { q: query, page }
    });
    return response.data.data;
};

export const getFavorites = async (): Promise<Movie[]> => {
    const response = await API.get(route.FAVORITIES);
    return response.data.data;
};

export const removeFavorite = async (id: string): Promise<Movie[]> => {
    const response = await API.delete(`${route.FAVORITIES}/${id}`)
    return response.data.data;
};

export const addFavorite = async (movie: Movie): Promise<Movie[]> => {
    const response = await API.post(route.FAVORITIES, movie);
    return response.data.data;
};

export default API;