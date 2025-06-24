const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routers/authRoutes.js");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


const mainRoutes = require("./routers/mainRoutes.js");
const authMW = require("./middlewares/authMW.js");

const app = express();
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)   
        console.log("Connected to DB") }
    catch(err) {
        console.log("Error connecting to DB", err) }
}

connectDB()

const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: `${process.env.CLIENT_URL}`,  
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    allowedHeaders: ['Content-Type', 'Authorization', 'email'],
    credentials: true  
}));

app.use(express.json());
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/', mainRoutes)  

app.listen(PORT, () => console.log(`Server running, port: ${PORT}`))