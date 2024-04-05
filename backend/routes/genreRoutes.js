const express = require("express");
const router = express.Router();

//Controllers
const genreController = require("../controllers/genreController");

//Middlewares
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", genreController.createGenre);

router.put("/:id", genreController.updateGenre);

router.delete("/:id", genreController.removeGenre);

router.get("/genres", genreController.listGenres);
router.get("/:id", genreController.getOneGenre);

module.exports = router;
