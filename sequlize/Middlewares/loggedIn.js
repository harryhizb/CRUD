const jwt = require('jsonwebtoken');
require('dotenv').config();

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    const secretKey = process.env.JWT_SECRET; // Fetch the secret key from environment variable

    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        console.log('Token verification error:', err);
        res.status(401).send('Unauthorized');
      } else {
        console.log('Decoded Token:', decodedToken);
        req.user = decodedToken; // Attach the decoded user information to the request
        next();
      }
    });
  } else {
    console.log("You need to login");
    res.status(401).send('Unauthorized');
  }
};

module.exports = { isLoggedIn };
