const express = require('express')

//CONTROLLERS
const auth = require('../controllers/userController')

const router = express.Router()

// CREATING A USER
router.post('/', auth.createUser)

//LOGIN USER
router.post('/auth', auth.loginUser);

//LOGOUT USER
router.post('/logout', auth.logoutCurrentUser);


module.exports = router;