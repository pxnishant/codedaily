import { Router } from "express";
import passport from "passport";
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.get('/login/failure', (req, res) => {
    res.status(401).json({
        error: true,
        message: "login failure",
    })
})


router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "log in success",
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: "not authorized" });
    }
})

router.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed"
    })
)

router.get("/google", passport.authenticate("google", { scope : ['profile', 'email'] }))

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
})

export default router;
