import express from "express";
import {
  getMovieDetailsController,
  getMoviesByCategoryController,
  getMovieTrailersController,
  getSimilarMoviesController,
  getTrendingMovieController,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovieController);
router.get("/:id/trailers", getMovieTrailersController);
router.get("/:id/details", getMovieDetailsController);
router.get("/:id/similar", getSimilarMoviesController);
router.get("/:category", getMoviesByCategoryController);

export default router;
