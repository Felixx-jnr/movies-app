const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware function to authenticate users
const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Retrieve the user from the database using the user ID from the token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request for further processing
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Check if user is admin

const authorizeAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message:
          "Access denied. You are not authorized to perform this action.",
      });
    }
    next();
  } catch (err) {
    // Handle any errors
    console.error("isAdminMiddleware error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authorizeAdmin;

module.exports = { authenticate, authorizeAdmin };
