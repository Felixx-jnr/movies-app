//dependencies
const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const path = require('path');


//Files 
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')

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

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))