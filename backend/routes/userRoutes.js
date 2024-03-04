const express = require('express')

//CONTROLLERS
const userController = require('../controllers/userController')

//MIDDLEWARES
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

// CREATING A USER
router.post('/', userController.createUser)

//GETTING ALL USERS
router.get('/', authMiddleware.authenticate, authMiddleware.authorizeAdmin, userController.getAllUsers)

//GET A USER
router.get('/profile', authMiddleware.authenticate, userController.getCurrentUserProfile)

//UPDATE USER
router.put('/profile', authMiddleware.authenticate, userController.updateCurrentUserProfile)

//LOGIN USER 
router.post('/auth', userController.loginUser);

//LOGOUT USER
router.post('/logout', userController.logoutCurrentUser);


module.exports = router;