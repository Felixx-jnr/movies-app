const express = require('express')
const router = express.Router();

//Controllers
const genreController = require('../controllers/genreController')
//Middlewares

const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware.authenticate, authMiddleware.authorizeAdmin, genreController.createGenre)



module.exports = router;