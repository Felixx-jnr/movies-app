const User = require('../models/userModel')
const bcrypt = require ('bcrypt')
const asyncHandler = require('../middlewares/asyncHandler')
const createToken = require('../utils/createToken')

//CREATING USER
const createUser = asyncHandler(async (req, res)=> {
  const {username, email, password} = req.body;

  //check if all fields have been filled
  if (!username || !email || !password) {
    throw new Error("Please fill all the fields")
  }
 
  //check if user already exist
  const userExist = await User.findOne({email})
  if (userExist) res.status(400).send('User already exists')

  //hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword  = await bcrypt.hash(password, salt)
  const newUser = new User({ username, email, password: hashedPassword })

  try {
    await newUser.save()
    createToken(res, newUser._id)

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    })

  } catch (error) {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

//LOGIN USER
const loginUser = asyncHandler(async (req, res) =>{
  const {email, password} = req.body;

  const existingUser = await User.findOne({email})
  
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(password, existingUser.password)

    if (isPasswordValid){
      createToken(res, existingUser._id)

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin
      })
    } else {
      res.status(401).json({message: "Invalid password"})
    }

  } else {
    res.status(401).json({message: "User not found"})
  }
})

const logoutCurrentUser = asyncHandler(async(req, res) =>{
  res.cookie("jwt", "",{
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({message: "logged out successfully"})
})

//LOGOUT CURRENT USER

module.exports = {
  loginUser, createUser, logoutCurrentUser
};