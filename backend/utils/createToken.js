const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    secure: true,
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

module.exports = generateToken;

// const jwt = require("jsonwebtoken");

// const generateToken = (userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });

//   return token; // Instead of setting the cookie, return the token
// };

// module.exports = generateToken;

// // Sample route that generates and sends the token
// const express = require("express");
// const router = express.Router();

// router.post("/login", (req, res) => {
//   const { userId } = req.body; // Obtain userId from the request body
//   const token = generateToken(userId);

//   res.status(200).json({
//     message: "Authentication successful",
//     token, // Send the token to the client in the response body
//   });
// });

// module.exports = router;
