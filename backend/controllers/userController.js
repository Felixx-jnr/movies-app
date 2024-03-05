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

    console.log(username, email, hashedPassword)

    
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

//LOGOUT CURRENT USER
const logoutCurrentUser = asyncHandler(async(req, res) =>{
  res.cookie("jwt", "",{
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({message: "logged out successfully"})
})

//GET ALL USERS
const getAllUsers = asyncHandler(async(req, res)=>{
  const users = await User.find({})
  res.json(users)
})

//GET CURRENT USER
const getCurrentUserProfile = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id);

  if(user){
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
  } else {
    res.status(404);
    throw new('User not found')
  }
  
})

//UPDATE A USER
const updateCurrentUserProfile = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id);

  if(user){
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    
    if(req.body.password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })

  } else {
    res.status(404)
    throw new Error('User not found')

  }
  
})


module.exports = {
  loginUser, createUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile
};