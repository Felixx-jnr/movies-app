//dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

//Files
const connectDB = require("./config/db");

const corsOptions = {
  origin: "*",
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));

dotenv.config();
connectDB();

//Routes
const userRoutes = require("./routes/userRoutes");
const genreRoutes = require("./routes/genreRoutes");
const movieRoutes = require("./routes/movieRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

//configuration

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

//Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genres", genreRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
