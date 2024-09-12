// const jwt = require('jsonwebtoken');
// require("dotenv").config();

// function verifyToken(req, res, next) {
//             const token = req.header('Authorization');
//             if (!token) return res.status(401).json({ error: 'Access denied' });
//                     try {
//                     const decoded = jwt.verify(token,process.env.JWTSTUFF);
//                     req.userId = decoded.userId;
//                     next();
//                     } catch (error) {
//                     res.status(401).json({ error: 'Invalid token' });
//                     }
//  };

// module.exports = verifyToken;

const jwt = require('jsonwebtoken');
require("dotenv").config();

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
  if (!token) {return res.status(401).json({ error: 'Access denied. No token provided' });}
  try {
    const decoded = jwt.verify(token, process.env.JWTSTUFF);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = verifyToken;
