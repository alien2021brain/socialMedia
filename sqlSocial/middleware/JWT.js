const jwt = require('jsonwebtoken');

const varifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log('varifying token');

  if (!token) {
    return res.status(403).send('you are not allowed to access this');
  }

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return res.status(400).send('Invalid JWT token: ' + err);
    req.id = payload.id;

    return next();
  });
};

module.exports = varifyToken;
