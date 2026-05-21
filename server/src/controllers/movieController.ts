import  {Request, Response,NextFunction} from "express";
import * as movieService from "../services/movieService.js";


export const searchMovies = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const query = req.query.q as string;
        const page = req.query.page as string;
        if(!query){
            return res.status(400).json({
                message:"search query required"
            })
        }

        const movies = await movieService.searchMovies(query,page);
        return res.status(200).json(movies);
    }catch(error){
        next(error)
    }
}

export const getFavorites = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const favorites = await movieService.getFavorites();
        res.status(200).json(favorites);
    }catch(error){
        next(error)
    }
}

export const addFavorites = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const movie = req.body
        const favorites = await movieService.addFavorites(movie);
        res.status(200).json(favorites)
    }catch(error){
        next(error)
    }

}

export const removeFavorites = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const Id = req.params.id as string;
        const favorites = await movieService.removeFavorites(Id);
        res.status(200).json(favorites);
    }catch(error){
        next(error)
    }
}