const express = require('express')

//controllers
//middlewares

const router = express.Router()

router.route('/').post(creatUser)

export default router;