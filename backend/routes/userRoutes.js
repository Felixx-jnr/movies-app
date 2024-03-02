const express = require('express')

//controllers

const createUser = require('../controllers/userController');
//middlewares

const router = express.Router()

// router.route('/').get(createUser)

router.post('/', createUser)

module.exports = router;