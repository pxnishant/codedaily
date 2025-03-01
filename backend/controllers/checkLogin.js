const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = (req, res) => {

    const token = req.cookies.authToken;

    console.log("Checking for login with token", token)
  
    if (!token) return res.json({ isAuthenticated: false });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.json({ isAuthenticated: false });
      res.json({ isAuthenticated: true, user: decoded });
    });
  }
