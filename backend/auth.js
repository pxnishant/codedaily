const passport = require('passport');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { Strategy: GoogleStrategy } = require("passport-google-oauth2");
const User = require('./database/User.js');
const { Resend } = require("resend");
const leetcode = require('./leetcodeData.js');
const express = require('express');

dotenv.config();

const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/google/failure'
    })
);


router.get('/login/success', async(req, res) => {
    if (req.user) {
        return res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            corrId: req.headers['x-correlation-id']
        })
    }
    else {
        res.status(401).json({
            success: false,
            message: "Not authenticated",
        });
    }
    
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
})

module.exports = router;
