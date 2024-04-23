const express = require("express");
const router = express.Router();

//CONTROLLERS
const {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getTopMovies,
  getNewMovies,
  getRandomMovies,
} = require("../controllers/movieController");

//MIDDLEWARES
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const checkId = require("../middlewares/checkId");

//PUBLIC ROUTES
//GET ALL MOVIES
router.get("/all-movies", getAllMovies);

//GET ONE MOVIE
router.get("/movie/:id", getSpecificMovie);

//RTK QUERIES
//GET NEW MOVIES
router.get("/new-movies", getNewMovies);

//GET TOP MOVIES
router.get("/top-movies", getTopMovies);

//GET RANDOM MOVIES
router.get("/random-movies", getRandomMovies);

//RESTRICTED ROUTES
//MOVIE REVIEW ROUTES
router.post("/reviews/:id", authenticate, checkId, movieReview);

//ADMIN ROUTES
//CREATE A MOVIE
router.post("/create", authenticate, authorizeAdmin, createMovie);

//UPDATE A MOVIE
router.put("/update/:id", authenticate, authorizeAdmin, updateMovie);

//DELETE A MOVIE
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);

//DELETE COMMENT
router.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment);

module.exports = router;
