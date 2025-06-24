const jwt = require('jsonwebtoken')
const Auth = require('../database/authSchema')

require('dotenv').config()

module.exports = async (req, res) => {

    const token = req.query.token
    console.log("Token received: ", token)

    if (!token) {
        return res.status(401).send(`No Token recieved.`)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        const userInDB = await Auth.findOne({ email: decoded.email });
    
        if (!userInDB) {
            return res.status(404).send(`User not found.`);
        }
    
        if (userInDB.token !== token) {
            return res.status(403).send(`Token expired.`);
        }
    
        const authToken = jwt.sign({ email: decoded.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
        return res.redirect(`${process.env.CLIENT_URL}/?token=${authToken}`);
    
    } catch (err) {
        console.error("Error during verification: ", err);
        return res.status(403).send(`Invalid or expired token.`);
    }
    
}