const jwt = require('jsonwebtoken')
const Auth = require('../database/authSchema')
const { Resend } = require('resend')
require('dotenv').config()

const backendURL = process.env.STATUS == 'production' ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.HOST


module.exports = async (req, res) => {
    
    const email = req.params.email;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: email }, secret, { expiresIn: '15m' })

    try {
        await Auth.updateOne(
            { email: email },
            {$set: {
                token: token,
                expires_at: new Date(Date.now() + 10 * 60 * 1000)
            }}, 
            { upsert: true }
        )
        console.log("Added token to DB successfully.")
        try {

            const magicLink = `https://${backendURL}/auth/verify?token=${token}`

            emailtext = `
                        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <div style="padding: 20px; color: #333333; line-height: 1.6; font-size: 16px;">
                        <p>Hi there,</p>
                        <p>Please click <a href = "${magicLink}">here</a> to authenticate yourself.
                        <p>This link will expire in 15 minutes. As long as you're on the same browser, you will automatically be logged in when you click.</p>
                        <p>Thank you,<br>Codeforces Notes</p>
                        </div>
                        </div>
                        `
            console.log("Resend key: ", process.env.RESEND_KEY)
            const resend = new Resend(process.env.RESEND_KEY);

            const { data, error } = await resend.emails.send({
                from: "CodeDaily <nishant@codedaily.tech>",
                to: email,
                subject: "Login link for CodeDaily",
                html: emailtext,
            });
            
            console.log('Email with login link sent successfully.')

            res.send('Magic link sent!')
        }

        catch(e) {
            console.log("Couldn't send email: ", e)
            res.status(500).end() 
        }
    }

    catch (e) {
        console.error("Couldn't add token to DB: ", e)
        res.status(500).end() 

    }
}