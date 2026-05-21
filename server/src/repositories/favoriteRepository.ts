import { Movie } from "../interfaces/movieInterface.js";
import { readFavorites,writeFavorites } from "../utils/fileHandler.js";

export const getFavorites = async ()=>{
    return readFavorites();
};

export const addFavorites = async (movie:Movie)=>{
    const favorites = await readFavorites()
       const exists = favorites.find(
        (f:Movie) => f.Id === movie.Id
       )
       if(exists){
        return favorites
       }
       favorites.push(movie);
       await writeFavorites(favorites);
       return favorites;
}

export const removeFavorites = async (Id:string)=>{
    const favorites = await readFavorites()
    const updatedFavorites = favorites.filter(
        (movie:Movie)=> movie.Id !== Id
    )
    await writeFavorites(updatedFavorites);
    return updatedFavorites;
}