import axios from "axios";
import type { Movie } from "../Type/movieType.ts";


const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export const searchMovies = async (query:string,page:number)=>{
    const response = await API.get("/api/movies/search", {
        params: { q: query, page }});
    console.log(response)
    return response.data
}

export const getFavorites = async (): Promise<Movie[]>=>{
    const response = await API.get("/api/movies/favorites")
    console.log(response)
    return response.data
}

export const removeFavorite = async (id: string): Promise<Movie[]> => {
    const response = await API.delete(`/api/movies/favorites/${id}`);
    console.log(response);
    return response.data;
};

export const addFavorite = async (movie: Movie): Promise<Movie[]> => {
    const response = await API.post("/api/movies/favorites", movie);
    console.log(response);
    return response.data;
};


export default API;