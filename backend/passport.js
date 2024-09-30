import gstrategy from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from 'dotenv';
import User from './database/User.js';
import { Resend } from "resend";
dotenv.config();
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path'

const GoogleStrategy = gstrategy.Strategy;
const resend = new Resend("re_LQxpSv4d_F21vmqvmdZcfRbdXzWDgQAGj");

const leetcode = []
fs.createReadStream(path.join(process.cwd(), 'leetcodeQ.csv'))
  .pipe(csv())
  .on('data', (data) => leetcode.push(data))
  .on('end', () => {
  });
  

passport.use(

    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },

        async function (accessToken, refreshToken, profile, done) {
            try {
                const email = profile.emails[0].value;
                let user = await User.findOne({ email: email });

                if (!user) {

                    user = new User({
                        email: email,
                        difficulty: new Array(9).fill(false),
                        topics: new Array(24).fill(false),
                        sentAlready: [],
                    });

                    await user.save();

                    const randomI = Math.floor(Math.random() * 500);
                    let emailtext = `Hi! Thank you for signing up. We wish you happy leetcoding.<br><br>
                    <strong>Here is your first question:</strong><br>
                    <a href = "${leetcode[randomI].link}">${leetcode[randomI].title}</a>
                    `

                    let newSentAlready = [leetcode[randomI].id]
                    User.updateOne({email: email}, {sentAlready: newSentAlready})

                    console.log('sending to this email: ', email)

                    const resp = await User.updateOne({ email: email }, { firstTime: false });

                    const { data, error } = await resend.emails.send({
                            from: "CodeDaily <nishant@codedaily.tech>",
                            to: email,
                            subject: "Welcome to CodeDaily! Your first question",
                            html: emailtext
                        });

                }

                return done(null, user);

            } catch (err) {
                return done(err, null);
            }
        }
    )
);


passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async function(email, done) {
    try {
        const user = await User.findOne({ email: email });
        done(null, user); 
    } catch (err) {
        done(err, null); 
    }
});

export default passport;
