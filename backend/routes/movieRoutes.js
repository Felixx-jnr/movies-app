const express = require('express')
const router = express.Router();

//CONTROLLERS
const {createMovie, getAllMovies, getSpecificMovie, updateMovie, movieReview} = require('../controllers/movieController')


//MIDDLEWARES
const {authenticate, authorizeAdmin} = require('../middlewares/authMiddleware')
const checkId = require('../middlewares/checkId')

//PUBLIC ROUTES
//GET ALL MOVIES
router.get('/all-movies', getAllMovies)

//GET ONE MOVIE
router.get('/movie/:id', getSpecificMovie)


//RESTRICTED ROUTES
router.post('/:id/reviews', authenticate, checkId, movieReview)



//ADMIN ROUTES
//CREATE A MOVIE
router.post('/create-movie', authenticate, authorizeAdmin, createMovie)

//UPDATE A MOVIE
router.put('/update-movie/:id', authenticate, authorizeAdmin, updateMovie)

module.exports = router;