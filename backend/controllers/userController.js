const User = require('../models/userModel')
const bcryptjs = require ('bcrypt')
const asyncHandler = require('../middlewares/asyncHandler')
const createToken = require('../utils/createToken')

const createUser = asyncHandler(async (req, res)=>{
  const {username, email, password} = req.body
})

module.exports = createUser