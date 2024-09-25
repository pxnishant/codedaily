import express from 'express'
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import passport from 'passport';
import cors from 'cors'
import authRoute from "./routes/auth.js"
dotenv.config();
import passportStrategy from "./passport.js"

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

app.listen(PORT, () => console.log(`Server running, port: ${PORT}`))