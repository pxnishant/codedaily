import express from 'express'
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors'
import authRoute from "./routes/auth.js"
import { Resend } from "resend";
import csv from 'csv-parser';
import fs from 'fs';
import passportStrategy from "./passport.js";
import mongoose from 'mongoose';
import User from './database/User.js';
import connectMongoDBSession from 'connect-mongodb-session';
import cron from 'node-cron';
import moment from 'moment-timezone';
import path from 'path'

dotenv.config();
mongoose.connect(process.env.MONGODB_URI)   

const MongoDBStore = connectMongoDBSession(session);

const PORT = process.env.PORT || 8080;
const app = express()
const resend = new Resend("re_LQxpSv4d_F21vmqvmdZcfRbdXzWDgQAGj");

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});

const leetcode = []
fs.createReadStream(path.join(process.cwd(), 'leetcodeQ.csv'))
  .pipe(csv())
  .on('data', (data) => leetcode.push(data))
  .on('end', () => {
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

function findQ(sentAlready, randomD, tarr) {

    for (let index = 0; index < leetcode.length; index++) {
        const item = leetcode[index];
        let alr = false;

        for (let i = 0; i<sentAlready.length; i++) {
            if (parseInt(item.id, 10) == sentAlready[i]) {
                alr = true;
            }
        }

        if (alr) {
            continue;
        }

        if (item.difficulty == randomD) {
            let rowtopics = JSON.parse(item.tags);

            for (let i = 0; i < tarr.length; i++) {
                for (let j = 0; j < rowtopics.length; j++) {
                    if (tarr[i] == rowtopics[j]) {
                        console.log([item.title, item.link, item.id]);
                        return [item.title, item.link, item.id];
                    }
                }
            }

        }
    }

    return ['', '', -1];
}



async function sendAll() {

    const users = await User.find().select({_id: 0, email: 1, difficulty: 1, topics: 1, sentAlready: 1});
    
    for (let i = 0; i<users.length; i++) {

        const email = users[i].email;
        const difficulty = users[i].difficulty;
        const topics =  users[i].topics;
        let sentAlready = users[i].sentAlready;

        let q1 = ['name', 'url', -1]
        let q2 = ['name', 'url', -1]
        let q3 = ['name', 'url', -1]

        //question 1
        let darr = []
        let tarr = []
        
        difficulty.forEach((item, index) => {

            if (index < 3 && item == 1) darr.push(index+1)

        })

        topics.forEach((item, index) => {

            if (index <= 7 && item == 1) tarr.push(index+1)

        })

        if (darr.length > 0) {

            let randomQ = darr[Math.floor(Math.random() * darr.length)];

            q1 = findQ(sentAlready, randomQ, tarr)

            if (q1[2] != -1) {
                sentAlready.push(q1[2]);
                await User.updateOne({email: email}, {sentAlready: sentAlready})
            }
                       
        }
        
        //question 2

        darr = []
        tarr = []
        
        difficulty.forEach((item, index) => {

            if (index >= 3 && index <= 5 && item == 1) darr.push(index-2)

        })

        topics.forEach((item, index) => {

            if (index >= 8 && index <= 15 && item == 1) tarr.push(index-7)

        })

        if (darr.length > 0) {

            let randomQ = darr[Math.floor(Math.random() * darr.length)];

            q2 = findQ(sentAlready, randomQ, tarr)

            if (q2[2] != -1) {
                sentAlready.push(q2[2]);
                await User.updateOne({email: email}, {sentAlready: sentAlready})
            }
                       
        }
        //question 3
        darr = []
        tarr = []
        
        difficulty.forEach((item, index) => {

            if (index >= 6 && index <= 8 && item == 1) darr.push(index-5)

        })

        topics.forEach((item, index) => {

            if (index >= 16 && item == 1) tarr.push(index-15)

        })

        if (darr.length > 0) {

            let randomQ = darr[Math.floor(Math.random() * darr.length)];

            q3 = findQ(sentAlready, randomQ, tarr)

            if (q3[2] != -1) {
                sentAlready.push(q3[2]);
                await User.updateOne({email: email}, {sentAlready: sentAlready})
            }

        }

        if (q3[2] != -1 && q2[2] == -1) {
            q2 = [...q3]
            q3[2] = -1;

        }

        let emailtext = `Here are your questions of the day!<br><br>`;

        if (q1[2] != -1) {
            emailtext += `
                <strong>Question 1: </strong><br>
                <a href="${q1[1]}">${q1[0]}</a><br>
            `;
        }
        
        if (q2[2] != -1) {
            emailtext += `
                <strong>Question 2: </strong><br>
                <a href="${q2[1]}">${q2[0]}</a><br>
            `;
        }
        
        if (q3[2] != -1) {
            emailtext += `
                <strong>Question 3: </strong><br>
                <a href="${q3[1]}">${q3[0]}</a><br>
            `;
        }

        if (q1[2] != -1 || q2[2] != -1 || q3[2] != -1) {

            const { data, error } = await resend.emails.send({
                from: "CodeDaily <nishant@codedaily.tech>",
                to: email,
                subject: "Your daily LeetCode Question",
                html: emailtext,
              });
              
              console.log('sending to', q1, q2)

        }

    }

}

cron.schedule('0 19 * * *', sendAll, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

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

app.get('/', async (req, res) => {
    res.send('CodeDaily server working perfectly!')
  })
  

app.listen(PORT, () => console.log(`Server running, port: ${PORT}`))