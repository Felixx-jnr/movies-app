//dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const axiosConfig = require("../frontend/axiosConfig");

//Files
const connectDB = require("./config/db");

const whitelist = ["https://movieshq.onrender.com"];

// Configure CORS options

const corsOptions = {
  origin: "https://movieshq.onrender.com",
  credentials: true,
};

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

const app = express();

app.use(cors(corsOptions));

dotenv.config();
connectDB();

// Configure Axios with the token
axiosConfig();

//Routes
const userRoutes = require("./routes/userRoutes");
const genreRoutes = require("./routes/genreRoutes");
const movieRoutes = require("./routes/movieRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "frontend", "src", "assets")));

// Route for serving the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

const PORT = process.env.PORT || 4000;

//Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genres", genreRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
