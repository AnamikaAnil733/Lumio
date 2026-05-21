import axios from "axios";
import { Movie } from "../interfaces/movieInterface.js";
import * as favoriteRepo from "../repositories/favoriteRepository.js";

export const searchMovies = async(query:string,page:string = "1")=>{
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


export const getFavorites = async ()=>{
    return await favoriteRepo.getFavorites();
}

export const removeFavorites = async (Id:string)=>{
   return await favoriteRepo.removeFavorites(Id);
}

export const addFavorites = async (movie:Movie)=>{
    return await favoriteRepo.addFavorites(movie);
}