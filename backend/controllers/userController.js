const User = require('../models/userModel')
const bcryptjs = require ('bcrypt')
const asyncHandler = require('../middlewares/asyncHandler')
const createToken = require('../utils/createToken')

const createUser = asyncHandler(async (req, res)=>{
  const {username, email, password} = req.body;

  //check if all fields are not filled
  if (!username || !email || !password) {
    throw new Error("Please fill all the fields")
  }
 
  //check if user already exist
  const userExist =await User.findOne({email})
  if (userExist) res.status(400).send('User already exists')

})

module.exports = createUser;