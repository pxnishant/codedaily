const passport = require('passport');
const dotenv = require('dotenv');
const { Strategy: GoogleStrategy } = require("passport-google-oauth2");
const User = require('./database/User.js');
const { Resend } = require("resend");
const leetcode = require('./leetcodeData.js');

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
            scope: ["profile", "email"],
        },

        async function (accessToken, refreshToken, profile, done) {
            try {
                const email = profile.emails[0].value;
                let user = await User.findOne({ email });

                if (!user) {
                    user = new User({
                        email,
                        difficulty: new Array(9).fill(false),
                        topics: new Array(24).fill(false),
                        sentAlready: [],
                    });

                    await user.save();

                    const randomI = Math.floor(Math.random() * 500);
                    const emailtext = `
                        Hi! Thank you for signing up. We wish you happy leetcoding.<br><br>
                        <strong>Here is your first question:</strong><br>
                        <a href="${leetcode[randomI].link}">${leetcode[randomI].title}</a>
                    `;

                    const newSentAlready = [leetcode[randomI].id];
                    await User.findOneAndUpdate({ email }, { sentAlready: newSentAlready, firstTime: false });

                    console.log('Sending email to:', email);

                    const { error } = await resend.emails.send({
                        from: "CodeDaily <nishant@codedaily.tech>",
                        to: email,
                        subject: "Welcome to CodeDaily! Your first question",
                        html: emailtext
                    });

                    if (error) {
                        console.error("Error sending email:", error);
                    }
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

