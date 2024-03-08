//dependencies
const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const path = require('path');


//Files 
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const genreRoutes = require('./routes/genreRoutes')
const movieRoutes = require('./routes/movieRoutes')

//configuration
dotenv.config();
connectDB();

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const PORT = process.env.PORT //|| 4000

//Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/genres', genreRoutes)
app.use('/api/v1/movies', movieRoutes)

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))