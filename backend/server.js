import express from 'express'
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors'
import authRoute from "./routes/auth.js"
import { Resend } from "resend";
dotenv.config();

import passportStrategy from "./passport.js"

import mongoose from 'mongoose'
import User from './database/User.js'
import connectMongoDBSession from 'connect-mongodb-session';

mongoose.connect(process.env.MONGODB_URI)   

const MongoDBStore = connectMongoDBSession(session);

const PORT = process.env.PORT || 8080;
const app = express()
const resend = new Resend("re_LQxpSv4d_F21vmqvmdZcfRbdXzWDgQAGj");

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});
  

app.use(cors({

    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    credentials: true,

}));

app.set('trust proxy', (process.env.NODE_ENV === 'production'))

app.use(session({

  secret: process.env.SESSION_SECRET || 'i like cats & they like me',
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    secure: (process.env.NODE_ENV === 'production'),
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax", 
    httpOnly: (process.env.NODE_ENV == 'production')
    }
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());

app.use("/auth", authRoute)

app.get('/getdata', async (req, res) => {

    const count = await User.countDocuments({ email: req.headers.email });
    
    if (count != 0) {

        const curr = await User.findOne({email : req.headers.email});
        return res.status(200).json(curr);

    }

    else {
        await User.create({
            email: req.headers.email,
            difficulty: new Array(9).fill(false),
            topics: new Array(24).fill(false)
        });
    }

}

)

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

function findQuestions(mail, difficulty, topics) {



}

async function sendAll() {

    const users = await User.find().select({_id: 0, email: 1, difficulty: 1, topics: 1});
    
    for (let i = 0; i<users.length; i++) {
        const mail = users[i].email;
        const difficulty = users[i].email;
        const topics =  users[i].topics;
    }


}

// app.get('/firstmail', async (req, res) => {

//     console.log('sending to this email: ', req.headers['email'])

//     const resp = await User.updateOne({ email: req.headers['email'] }, { firstTime: false });

//     const { data, error } = await resend.emails.send({
//             from: "CodeDaily <nishant@codedaily.tech>",
//             to: req.headers['email'],
//             subject: "Your daily LeetCode Question",
//             html: "<strong>here is your first question!</strong>",
//         });
        
//         if (error) {
//             return res.status(400).json({ error });
//         }
        
//         res.status(200).json({ data });
// })


app.get('/sendmail', async (req, res, content) => {

    const { data, error } = await resend.emails.send({
        from: "CodeDaily <nishant@codedaily.tech>",
        to: ["nishantsvis@gmail.com"],
        subject: "Your daily LeetCode Question",
        // html: "<strong>it works!</strong>",
        html: content,
      });
    
      if (error) {
        return res.status(400).json({ error });
      }
    
    res.status(200).json({ data });

})

// app.get('/', async (req, res) => {
//     res.send('CodeDaily server working perfectly!')
//   })
  

app.listen(PORT, () => console.log(`Server running, port: ${PORT}`))