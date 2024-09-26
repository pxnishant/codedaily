import express from 'express'
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import passport from 'passport';
import cors from 'cors'
import authRoute from "./routes/auth.js"
dotenv.config();

import passportStrategy from "./passport.js"

import mongoose from 'mongoose'
import User from './database/User.js'

mongoose.connect(process.env.MONGODB_URI)

const app = express()
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use(
    cookieSession(
        {
            name: "session",
            keys: ["codedaily"],
            maxAge: 24 * 60 * 60 * 1000

        }

    )
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

app.use("/auth", authRoute)

app.post('/updateuser', async (req, res) => {

    try {

        const { email, difficulty, topics } = req.body;

        const count = await User.countDocuments({ email: email });

        if (count === 0) {

            await User.create({
                email: email,
                difficulty: difficulty,
                topics: topics
            });

            res.status(201).json({ message: 'User successfully added' });

        }
        
        else {

            await User.updateOne({ email: email }, {
                difficulty: difficulty,
                topics: topics
            });

            res.status(200).json({ message: 'User successfully updated' });

        }

    }
    
    catch (error) {

        res.status(500).json({ message: 'Error adding/updating user', error: error.message });
        
    }
});


app.listen(PORT, () => console.log(`Server running, port: ${PORT}`))