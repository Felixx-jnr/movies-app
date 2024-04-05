const express = require("express");
const router = express.Router();

//Controllers
const {
  createGenre,
  updateGenre,
  removeGenre,
  listGenres,
  getOneGenre,
} = require("../controllers/genreController");

//Middlewares
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

router.post("/", authenticate, authorizeAdmin, createGenre);

router.put("/:id", authenticate, authorizeAdmin, updateGenre);

router.delete("/:id", authenticate, authorizeAdmin, removeGenre);

router.get("/genres", listGenres);

router.get("/:id", getOneGenre);

module.exports = router;
