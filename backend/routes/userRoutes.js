const express = require("express");

//CONTROLLERS
const {
  loginUser,
  createUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} = require("../controllers/userController");

//MIDDLEWARES
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// CREATING A USER
router.post("/", createUser);

//GETTING ALL USERS
router.get("/", authenticate, authorizeAdmin, getAllUsers);

//GET A USER
router.get("/profile", authenticate, getCurrentUserProfile);

//UPDATE USER
router.put("/profile", authenticate, updateCurrentUserProfile);

//LOGIN USER
router.post("/auth", loginUser);

//LOGOUT USER
router.post("/logout", logoutCurrentUser);

module.exports = router;
