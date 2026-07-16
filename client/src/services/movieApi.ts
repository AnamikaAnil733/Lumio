import axios from "axios";
import type { Movie } from "../Type/movieType.ts";
import { getSessionId } from "../utils/session";
import { route } from "../constants/routes/routes.ts";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});


API.interceptors.request.use(
    (config) => {
        config.headers["X-Session-Id"] = getSessionId();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


API.interceptors.response.use(
    (response) => {
        return response.data.data;
    },
    (error) => {
        console.error("API call failed:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);



export const searchMovies = async (query: string, page: number): Promise<any> => {
    return API.get<any, any>(route.SEARCHMOVIES, {
        params: { q: query, page }
    });
};

export const getFavorites = async (): Promise<Movie[]> => {
    return API.get<any, Movie[]>(route.FAVORITIES);
};

export const removeFavorite = async (id: string): Promise<Movie[]> => {
    return API.delete<any, Movie[]>(`${route.FAVORITIES}/${id}`);
};

export const addFavorite = async (movie: Movie): Promise<Movie[]> => {
    return API.post<any, Movie[]>(route.FAVORITIES, movie);
};

export default API;