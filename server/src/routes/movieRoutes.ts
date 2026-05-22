import express from "express";
import { movieController } from "../composition/movieComposition.js";

const router = express.Router();

router.get("/search", movieController.searchMovies);
router.get("/favorites", movieController.getFavorites);
router.post("/favorites", movieController.addFavorites);
router.delete("/favorites/:id", movieController.removeFavorites);



export default router;