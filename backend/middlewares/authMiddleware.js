const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("./asyncHandler");

//check if user is authenticated or not

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //Read JWT from the 'jwt' cookie

  token = req.cookies.jwt;
  console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token Oga");
  }
});

//Check if user is admin

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an Admin");
  }
};

module.exports = { authenticate, authorizeAdmin };
