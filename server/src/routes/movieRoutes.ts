import express from "express";
import { searchMovies,getFavorites,addFavorites,removeFavorites } from "../controllers/movieController.js";

const router = express.Router();

router.get("/search", searchMovies);


router.get("/favorites", getFavorites);

router.post("/favorites", addFavorites);

router.delete(
  "/favorites/:id",
  removeFavorites
);



export default router;