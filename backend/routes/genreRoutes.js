const express = require("express");
const router = express.Router();

//Controllers
const genreController = require("../controllers/genreController");

//Middlewares
const authMiddleware = require("../middlewares/authMiddleware");

<<<<<<< HEAD
router.post("/", authMiddleware.authorizeAdmin, genreController.createGenre);
router.put("/:id", authMiddleware.authorizeAdmin, genreController.updateGenre);
=======
router.post("/", genreController.createGenre);
router.put(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeAdmin,
  genreController.updateGenre
);
>>>>>>> parent of 05f2bee (local working well)
router.delete(
  "/:id",
  authMiddleware.authorizeAdmin,
  genreController.removeGenre
);
router.get("/genres", genreController.listGenres);
router.get("/:id", genreController.getOneGenre);

module.exports = router;
