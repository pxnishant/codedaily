const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ isAuthenticated: false });
  }
  
  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log("checking inside check login", decoded);
    
    if (err) {
      return res.json({ isAuthenticated: false });
    }
    
    res.json({ 
      isAuthenticated: true,
      email: decoded.email
    });
  });
};