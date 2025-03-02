const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send("Access Token Required.");
  }
  
  const token = authHeader.split(' ')[1];
  
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid or Expired Token!");
    
    if (req.method === "POST" || req.method === "PUT") {
      req.body.email = decoded.email;
    }
    else if (req.method === "GET") {
      if (!req.query) {
        req.query = {};
      }
      req.query.email = decoded.email;
    }
    
    next();
  });
};