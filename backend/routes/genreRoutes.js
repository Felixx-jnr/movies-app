const express = require("express");
const router = express.Router();

//Controllers
const genreController = require("../controllers/genreController");

//Middlewares
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware.authorizeAdmin, genreController.createGenre);
router.put(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeAdmin,
  genreController.updateGenre
);
router.delete(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeAdmin,
  genreController.removeGenre
);
router.get("/genres", genreController.listGenres);
router.get("/:id", genreController.getOneGenre);

module.exports = router;
