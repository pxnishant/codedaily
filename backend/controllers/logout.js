require('dotenv').config()

module.exports = (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.STATUS == 'production',
        sameSite: "Lax"
    });

    res.redirect(process.env.CLIENT_URL)
};
