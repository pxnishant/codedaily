import gstrategy from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from 'dotenv';
import User from './database/User.js';
dotenv.config();

const GoogleStrategy = gstrategy.Strategy;

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
                console.log('printing em', email)
                let user = await User.findOne({ email: email });

                if (!user) {
                    user = new User({
                        email: email,
                        difficulty: new Array(9).fill(false),
                        topics: new Array(24).fill(false),
                    });
                    await user.save();
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
        // console.log('deserializing', user);
        done(null, user); 
    } catch (err) {
        done(err, null); 
    }
});

export default passport;
