import express from "express";
import { movieController } from "../composition/movieComposition.js";
import { validateSession } from "../middlewares/sessionMiddleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/search",asyncHandler(movieController.searchMovies));
router.get("/favorites", validateSession, asyncHandler(movieController.getFavorites));
router.post("/favorites", validateSession, asyncHandler(movieController.addFavorites));
router.delete("/favorites/:id",validateSession, asyncHandler(movieController.removeFavorites));



export default router;